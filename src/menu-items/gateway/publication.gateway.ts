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

  sendCreate(publication: Publication | { image: string | null; [key: string]: any }) {
  this.server.emit('publication_created', publication);
}

sendUpdate(publication: Publication | { image: string | null; [key: string]: any }) {
  this.server.emit('publication_updated', publication);
}

sendList(list: (Publication | { image: string | null; [key: string]: any })[]) {
  this.server.emit('publication_list', list);
}

sendDelete(id: number) {
  this.server.emit('publication_deleted', { id });
}
}
