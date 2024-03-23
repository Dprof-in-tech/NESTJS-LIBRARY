import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { SeederService } from './seeder.service';
import { SeedGuard } from './seed.guard';
import { User } from './books/entities/user.entity';
import { readFileSync } from 'fs';
import { Book } from './books/entities/books.entity';
import { Order } from './books/entities/order.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize: true, // Recommended to be false for production
        ssl: {
          rejectUnauthorized: true, // You should have this true to verify the server's cert
          ca: readFileSync(process.env.CA_PEM_PATH).toString(),
          // If client certificate authentication is needed
          // key: readFileSync('./path/to/client-key.key').toString(),
          // cert: readFileSync('./path/to/client-cert.crt').toString(),
        },
      }),
    }),
    TypeOrmModule.forFeature([Book, User, Order]),
    BookModule,
  ],
  controllers: [AppController], // Remove AppController from controllers array if not used
  providers: [
    AppService,
    SeederService,
    SeedGuard, // Add SeedGuard to providers array
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seedGuard: SeedGuard) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedGuard.checkAndSeedIfNeeded();
  }
}
