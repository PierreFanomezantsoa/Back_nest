import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Commande } from '../entities/commande.entity';
import { CreateCommandeDto } from '../dto/create-commande.dto';
import { UpdateCommandeDto } from '../dto/update-commande.dto';

@Injectable()
export class CommandeService {
  private socketServer: any;

  constructor(
    @InjectRepository(Commande)
    private readonly commandeRepository: Repository<Commande>,
  ) {}

  setSocketServer(server: any) {
    this.socketServer = server;
  }

  async create(dto: CreateCommandeDto): Promise<Commande> {
    const commande = this.commandeRepository.create(dto);
    const saved = await this.commandeRepository.save(commande);

    if (this.socketServer) this.socketServer.emit('commande:new', saved);
    return saved;
  }

  async findAll(): Promise<Commande[]> {
    return this.commandeRepository.find({ order: { created_at: 'DESC' } });
  }

  async findOne(id: number): Promise<Commande> {
    const commande = await this.commandeRepository.findOne({ where: { id } });
    if (!commande) throw new NotFoundException(`Commande ${id} introuvable`);
    return commande;
  }

  async update(id: number, dto: UpdateCommandeDto): Promise<Commande> {
    const existing = await this.findOne(id);
    const updated = { ...existing, ...dto };
    await this.commandeRepository.save(updated);

    if (this.socketServer) this.socketServer.emit('commande:update', updated);
    return updated;
  }

  async remove(id: number): Promise<void> {
    const result = await this.commandeRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Commande ${id} introuvable`);

    if (this.socketServer) this.socketServer.emit('commande:delete', id);
  }

  async countRecent(): Promise<number> {
    const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);
    return this.commandeRepository.count({ where: { created_at: MoreThan(threeMinutesAgo) } });
  }
}
