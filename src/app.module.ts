import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

import { MenuItemModule } from './menu-items/menu-item.module';
import { CommandeModule } from './menu-items/commande.module';
import { AdminModule } from './menu-items/admin.module';
import { SocketModule } from './menu-items/socket.module';

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

    // Serve les fichiers statiques (images) depuis le dossier uploads
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),

    MenuItemModule,
    CommandeModule,
    AdminModule,
    SocketModule,
  ],
})
export class AppModule {}
