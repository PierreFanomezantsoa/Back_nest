import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Publication } from '../entities/publication.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class PublicationGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('Client connected to Publications Gateway');
  }

  sendCreate(publication: Publication) {
    this.server.emit('publication_created', publication);
  }

  sendUpdate(publication: Publication) {
    this.server.emit('publication_updated', publication);
  }

  sendDelete(id: number) {
    this.server.emit('publication_deleted', { id });
  }

  sendList(list: Publication[]) {
    this.server.emit('publication_list', list);
  }
}
