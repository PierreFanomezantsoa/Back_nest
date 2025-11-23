import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from './entities/commande.entity';
import { CommandeController } from './controllers/commande.controller';
import { CommandeService } from './services/commande.service';
import { CommandeGateway } from './gateway/commande.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Commande])],
  controllers: [CommandeController],
  providers: [CommandeService, CommandeGateway],
  exports: [CommandeService],
})
export class CommandeModule {}
