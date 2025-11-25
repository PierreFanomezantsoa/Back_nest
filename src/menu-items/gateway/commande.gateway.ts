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
    this.commandeService.setSocketServer(this.server);
    console.log('📡 Socket.io initialisé pour commandes');
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.auth.userId as string;
    console.log(`🟢 Client connecté: userId=${userId}, socketId=${client.id}`);
    this.commandeService.registerSocket(userId, client);
  }

  handleDisconnect(client: Socket) {
    console.log(`🔴 Client déconnecté: socketId=${client.id}`);
    this.commandeService.unregisterSocket(client.id);
  }
}
