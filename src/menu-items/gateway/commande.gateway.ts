import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CommandeService } from '../services/commande.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CommandeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly commandeService: CommandeService) {}

  afterInit() {
    // Injecter le serveur socket.io dans le service
    this.commandeService.setSocketServer(this.server);
    console.log('📡 Socket.io initialisé pour commandes');
  }

  handleConnection(client: Socket) {
    console.log('🟢 Client connecté:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('🔴 Client déconnecté:', client.id);
  }
}
