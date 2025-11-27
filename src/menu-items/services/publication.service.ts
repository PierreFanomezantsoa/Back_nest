import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publication } from '../entities/publication.entity';
import { CreatePublicationDto } from '../dto/create-publication.dto';
import { UpdatePublicationDto } from '../dto/update-publication.dto';
import { PublicationGateway } from '../gateway/publication.gateway';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private repo: Repository<Publication>,
    private gateway: PublicationGateway,
  ) {}

  async create(data: CreatePublicationDto) {
    const publication = this.repo.create(data);
    const saved = await this.repo.save(publication);

    this.gateway.sendCreate(saved); // 🔥 SOCKET IO
    return saved;
  }

  async findAll() {
    const list = await this.repo.find();

    this.gateway.sendList(list); // 🔥 SOCKET IO
    return list;
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

async update(id: number, data: UpdatePublicationDto) {
  await this.repo.update(id, data);
  const updated = await this.repo.findOneBy({ id });

  if (updated) {
    this.gateway.sendUpdate(updated); // OK
  }

  return updated;
}


  async remove(id: number) {
    await this.repo.delete(id);

    this.gateway.sendDelete(id); // 🔥 SOCKET IO
    return { deleted: true, id };
  }
}
