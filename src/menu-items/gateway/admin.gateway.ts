import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class AdminGateway {
  @WebSocketServer()
  server: Server;

  notifyLogin(admin) {
    this.server.emit('admin_login', admin);
  }
}
