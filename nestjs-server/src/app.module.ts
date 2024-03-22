import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { BookModule } from './books/books.module';
import { readFileSync } from 'fs';
import {User} from './books/entities/user.entity';
import {Book} from './books/entities/books.entity';
import { SeederService } from './seeder.service';

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
    TypeOrmModule.forFeature([Book, User]), 
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}
