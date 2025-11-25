import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemModule } from './menu-items/menu-item.module';
import { CommandeModule } from './menu-items/commande.module';
import { AdminModule } from './menu-items/admin.module';
import {SocketModule} from "./menu-items/socket.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0701',
      database: 'kiosque',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    MenuItemModule,
    CommandeModule,
    AdminModule,
    SocketModule
  ],
})
export class AppModule {}
