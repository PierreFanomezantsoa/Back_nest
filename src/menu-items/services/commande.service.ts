import { Injectable, NotFoundException } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Repository, MoreThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Commande } from '../entities/commande.entity';
import { CreateCommandeDto } from '../dto/create-commande.dto';
import { UpdateCommandeDto } from '../dto/update-commande.dto';

@Injectable()
export class CommandeService {

  // ✔️ Correction : on autorise null
  private socketServer: Server | null = null;
  private sockets = new Map<string, Socket>();

  constructor(
    @InjectRepository(Commande)
    private readonly repo: Repository<Commande>,
  ) {}

  /* ================================================================
      SOCKET.IO
  ================================================================= */

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

  // ✔️ broadcast sécurisé à tous les clients
  private broadcast(event: string, payload: any) {
    if (this.socketServer) {
      this.socketServer.emit(event, payload);
    }
  }

  /* ================================================================
      LOGIQUE METIER
  ================================================================= */

  async create(dto: CreateCommandeDto) {
    const c = this.repo.create(dto);
    const saved = await this.repo.save(c);

    // envoyer événement temps réel
    this.broadcast('commande:new', saved);

    return saved;
  }

  async findAll() {
    return this.repo.find({
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Commande introuvable');
    return item;
  }

  async update(id: number, dto: UpdateCommandeDto) {
    const cmd = await this.findOne(id);
    Object.assign(cmd, dto);

    const updated = await this.repo.save(cmd);

    this.broadcast('commande:update', updated);

    return updated;
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Commande introuvable');

    this.broadcast('commande:delete', id);

    return { success: true };
  }

  /* ================================================================
      ✔️ MÉTHODE QUI MANQUAIT — FIX ERREUR TS2339
  ================================================================= */

  async countRecent(): Promise<number> {
    const since = new Date();
    since.setHours(since.getHours() - 1); // commandes de la dernière heure

    return this.repo.count({
      where: {
        created_at: MoreThan(since),
      },
    });
  }
}
