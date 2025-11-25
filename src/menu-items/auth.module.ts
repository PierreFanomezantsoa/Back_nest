import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/Admin.entity';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { CommandeGateway } from './gateway/commande.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      secret: 'SECRET_ADMIN', // change à ton goût
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AdminService, CommandeGateway],
  controllers: [AdminController],
})
export class AdminModule {}
