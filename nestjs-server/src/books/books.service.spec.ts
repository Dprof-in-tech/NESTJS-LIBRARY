import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/books.entity';
import { Order } from './entities/order.entity';
import { User } from './entities/user.entity'; // Import the User entity

describe('BookService', () => {
  let service: BookService;
  let bookRepository: Repository<Book>;
  let userRepository: Repository<User>; // Declare userRepository
  let orderRepository: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository, // Use the actual Repository class for Book
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // Use the actual Repository class for User
        },
        {
          provide: getRepositoryToken(Order),
          useClass: Repository, // Use the actual Repository class for Order
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User)); 
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));// Retrieve userRepository
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
