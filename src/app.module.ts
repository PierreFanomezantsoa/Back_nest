// app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

import { MenuItemModule } from './menu-items/menu-item.module';
import { CommandeModule } from './menu-items/commande.module';
import { AdminModule } from './menu-items/admin.module';
import { SocketModule } from './menu-items/socket.module';
import { PublicationModule } from './menu-items/publication.module';

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

     // MODIFICATION CRITIQUE ICI : Ciblez directement le dossier 'menus'
     ServeStaticModule.forRoot({
        // Le chemin physique pointe directement vers le dossier des images
        rootPath: join(__dirname, '..', 'uploads', 'menus'),
    
        // Le chemin HTTP doit correspondre exactement à ce que le contrôleur construit
        // Le contrôleur construit: http://.../uploads/menus/image.jpg
        serveRoot: '/uploads/menus',
     }),

   MenuItemModule,
   CommandeModule,
   AdminModule,
   SocketModule,
   PublicationModule,
 ],
})
export class AppModule {}