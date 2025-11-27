import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publication } from '../entities/publication.entity';
import { CreatePublicationDto } from '../dto/create-publication.dto';
import { UpdatePublicationDto } from '../dto/update-publication.dto';
import { PublicationGateway } from '../gateway/publication.gateway';

const BASE_URL = 'http://192.168.1.133:3000/uploads/publications/';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private readonly repo: Repository<Publication>,
    private readonly gateway: PublicationGateway, // ← injection du gateway
  ) {}

  async create(dto: CreatePublicationDto, file?: any) {
    const publication = this.repo.create({
      ...dto,
      image: file ? file.filename : null,
    });
    const saved = await this.repo.save(publication);

    const pubWithUrl = this.formatImage(saved);
    this.gateway.sendCreate(pubWithUrl); // 🔥 événement socket
    return pubWithUrl;
  }

  async findAll() {
    const pubs = await this.repo.find();
    const pubsWithUrl = pubs.map(pub => this.formatImage(pub));
    this.gateway.sendList(pubsWithUrl); // 🔥 optionnel : envoie liste initiale
    return pubsWithUrl;
  }

  async findOne(id: number) {
    const pub = await this.repo.findOne({ where: { id } });
    if (!pub) return null;
    return this.formatImage(pub);
  }

  async update(id: number, dto: UpdatePublicationDto, file?: any) {
    const current = await this.repo.findOne({ where: { id } });
    if (!current) throw new NotFoundException('Publication non trouvée');

    const image = file ? file.filename : current.image;
    await this.repo.update(id, { ...dto, image });
    const updated = await this.repo.findOne({ where: { id } });
    if (!updated) throw new NotFoundException('Publication introuvable après mise à jour');

    const updatedWithUrl = this.formatImage(updated);
    this.gateway.sendUpdate(updatedWithUrl); // 🔥 événement socket
    return updatedWithUrl;
  }

  async remove(id: number) {
    const pub = await this.repo.findOne({ where: { id } });
    if (!pub) throw new NotFoundException('Publication non trouvée');

    await this.repo.delete(id);
    this.gateway.sendDelete(id); // 🔥 événement socket
    return this.formatImage(pub);
  }

  private formatImage(pub: Publication) {
    return {
      ...pub,
      image: pub.image ? `${BASE_URL}${pub.image}` : null,
    };
  }
}
