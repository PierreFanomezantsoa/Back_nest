// socket.module.ts
import { Module } from '@nestjs/common';
import { AdminGateway } from './gateway/admin.gateway';
import { CommandeGateway } from './gateway/commande.gateway';
import { CommandeModule } from '../menu-items/commande.module';

@Module({
  imports: [CommandeModule], // tokony import-ina eto
  providers: [AdminGateway, CommandeGateway],
  exports: [AdminGateway, CommandeGateway],
})
export class SocketModule {}
