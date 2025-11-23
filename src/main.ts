import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' }); // autoriser toutes les origines (React Native)
  await app.listen(3000, '0.0.0.0'); // écouter sur toutes les interfaces réseau
  console.log('NestJS démarré sur 0.0.0.0:3000');
}
bootstrap();
