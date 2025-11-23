import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'kiosque_db',
      autoLoadEntities: true,
      synchronize: true, // ⚠️ en prod mettre false
    }),
  ],
})
export class AppModule {}
