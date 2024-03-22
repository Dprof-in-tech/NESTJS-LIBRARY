import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/books.entity';
import { User } from './entities/user.entity';
import { BookstoreController } from './books.controller';
import { BookService } from './books.service';
import { Order } from './entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, User, Order]),
     // Importing both Book and User entities
  ],
  controllers: [BookstoreController],
  providers: [BookService],
})
export class BookModule {}
