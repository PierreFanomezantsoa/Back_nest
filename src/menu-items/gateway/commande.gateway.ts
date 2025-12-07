import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CommandeService } from '../services/commande.service';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
})
export class CommandeGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly commandeService: CommandeService) {}

  afterInit() {
    this.commandeService.setSocketServer(this.server);
    console.log('📡 CommandeGateway initialisé');
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.auth?.userId || 'unknown';
    console.log(`🟢 Client connecté: socketId=${client.id} userId=${userId}`);
    this.commandeService.registerSocket(userId, client);
  }

  handleDisconnect(client: Socket) {
    console.log(`🔴 Client déconnecté: socketId=${client.id}`);
    this.commandeService.unregisterSocket(client.id);
  }
}
