import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder.service';
import { setupSwagger } from '../swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.enableCors();
  const seederService = app.get(SeederService);
  await seederService.seedDatabase();
  await app.listen(3001);
}
bootstrap();

