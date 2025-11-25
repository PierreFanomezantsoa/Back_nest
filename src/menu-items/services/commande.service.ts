import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Commande } from '../entities/commande.entity';
import { CreateCommandeDto } from '../dto/create-commande.dto';
import { UpdateCommandeDto } from '../dto/update-commande.dto';
import { Socket, Server } from 'socket.io';

@Injectable()
export class CommandeService {
  private socketServer: Server;
  private sockets: Map<string, Socket> = new Map(); // userId => socket

  constructor(
    @InjectRepository(Commande)
    private readonly commandeRepository: Repository<Commande>,
  ) {}

  setSocketServer(server: Server) {
    this.socketServer = server;
  }

  registerSocket(userId: string, client: Socket) {
    this.sockets.set(userId, client);
  }

  unregisterSocket(socketId: string) {
    for (const [userId, socket] of this.sockets.entries()) {
      if (socket.id === socketId) {
        this.sockets.delete(userId);
        break;
      }
    }
  }

  emitNewCommande(data: any) {
    this.sockets.forEach((socket) => socket.emit('commande:new', data));
  }

  emitUpdateCommande(data: any) {
    this.sockets.forEach((socket) => socket.emit('commande:update', data));
  }

  emitDeleteCommande(id: number) {
    this.sockets.forEach((socket) => socket.emit('commande:delete', id));
  }

  async create(dto: CreateCommandeDto): Promise<Commande> {
    const commande = this.commandeRepository.create(dto);
    const saved = await this.commandeRepository.save(commande);
    this.emitNewCommande(saved);
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
    this.emitUpdateCommande(updated);
    return updated;
  }

  async remove(id: number): Promise<void> {
    const result = await this.commandeRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Commande ${id} introuvable`);
    this.emitDeleteCommande(id);
  }

  async countRecent(): Promise<number> {
    const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);
    return this.commandeRepository.count({ where: { created_at: MoreThan(threeMinutesAgo) } });
  }
}
