import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { PublicationService } from './services/publication.service';
import { PublicationController } from './controllers/publication.controller';
import { PublicationGateway } from './gateway/publication.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Publication])],
  controllers: [PublicationController],
  providers: [PublicationService, PublicationGateway],
})
export class PublicationModule {}
