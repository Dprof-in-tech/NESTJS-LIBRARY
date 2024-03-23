import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './books/entities/books.entity';
import { User } from './books/entities/user.entity';
import { Order } from './books/entities/order.entity';

@Injectable()
export class SeederService {
  seed() {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async seedDatabase() {
    const isSeeded = await this.isSeeded();
    if (!isSeeded) {
      await this.seedBooks();
      await this.seedUsers();
      await this.seedOrders();
      // Add more seed methods as needed
    }
  }

  async isSeeded(): Promise<boolean> {
    const bookCount = await this.bookRepository.count();
    const userCount = await this.userRepository.count();
    const orderCount = await this.orderRepository.count();
    return bookCount > 0 && userCount > 0 && orderCount > 0;
  }

  private async seedBooks() {
    const booksData = [
      {
        title: 'Book 1',
        description: 'Description of Book 1',
        author: 'Author 1',
        price: 10,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['fiction', 'fantasy'],
        available: true,
      },
      {
        title: 'Book 2',
        description: 'Description of Book 2',
        author: 'Author 2',
        price: 12,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['non-fiction', 'history'],
        available: true,
      },
      {
        title: 'Book 3',
        description: 'Description of Book 3',
        author: 'Author 3',
        price: 12,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['non-fiction', 'history'],
        available: true,
      },
      {
        title: 'Book 4',
        description: 'Description of Book 4',
        author: 'Author 4',
        price: 12,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['non-fiction', 'history'],
        available: true,
      },
      {
        title: 'Book 5',
        description: 'Description of Book 5',
        author: 'Author 5',
        price: 12,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['non-fiction', 'history'],
        available: true,
      },
      {
        title: 'Book 6',
        description: 'Description of Book 6',
        author: 'Author 6',
        price: 12,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['non-fiction', 'history'],
        available: true,
      },
      {
        title: 'Book 7',
        description: 'Description of Book 7',
        author: 'Author 7',
        price: 10,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['non-fiction', 'history'],
        available: true,
      },
      {
        title: 'Book 8',
        description: 'Description of Book 8',
        author: 'Author 8',
        price: 12,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['fiction', 'fantasy'],
        available: true,
      },
      {
        title: 'Book 9',
        description: 'Description of Book 9',
        author: 'Author 9',
        price: 14,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['fiction', 'romance'],
        available: true,
      },
      {
        title: 'Book 10',
        description: 'Description of Book 10',
        author: 'Author 10',
        price: 9,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['fiction', 'mystery'],
        available: true,
      },
      {
        title: 'Book 11',
        description: 'Description of Book 11',
        author: 'Author 11',
        price: 12,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['non-fiction', 'history'],
        available: true,
      },
      {
        title: 'Book 12',
        description: 'Description of Book 12',
        author: 'Author 12',
        price: 8,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['fiction', 'science fiction'],
        available: true,
      },
      {
        title: 'Book 13',
        description: 'Description of Book 13',
        author: 'Author 13',
        price: 11,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['non-fiction', 'biography'],
        available: true,
      },
      {
        title: 'Book 14',
        description: 'Description of Book 14',
        author: 'Author 14',
        price: 15,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['fiction', 'fantasy'],
        available: true,
      },
      {
        title: 'Book 15',
        description: 'Description of Book 15',
        author: 'Author 15',
        price: 15,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['fiction', 'fantasy'],
        available: true,
      },
      {
        title: 'Book 16',
        description: 'Description of Book 16',
        author: 'Author 16',
        price: 15,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['fiction', 'fantasy'],
        available: true,
      },
      {
        title: 'Book 17',
        description: 'Description of Book 17',
        author: 'Author 17',
        price: 15,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['fiction', 'fantasy'],
        available: true,
      },
      {
        title: 'Book 18',
        description: 'Description of Book 18',
        author: 'Author 18',
        price: 15,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['fiction', 'fantasy'],
        available: true,
      },
    ];

    await this.bookRepository.save(booksData);
  }

  private async seedUsers() {
    const usersData = [
      {
        username: 'user1',
        email: 'user1@example.com',
        password: 'password1',
        // Other user data
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        password: 'password2',
        // Other user data
      },
      // Add more users as needed
    ];

    await this.userRepository.save(usersData);
  }

  private async seedOrders() {
    // Assuming each order is associated with a user and contains one or more books
    const ordersData = [
      {
        userId: 1, 
        bookId: 1,
        pointsUsed: 20
      },
      {
        userId: 2, 
        bookId: 1,
        pointsUsed: 20
      },
      {
        userId: 1, 
        bookId: 2,
        pointsUsed: 20
      },
      {
        userId: 2, 
        bookId: 2,
        pointsUsed: 20
      },
      {
        userId: 1, 
        bookId: 3,
        pointsUsed: 20
      },
      {
        userId: 2, 
        bookId: 3,
        pointsUsed: 20
      },
      {
        userId: 2, 
        bookId: 4,
        pointsUsed: 20
      },
      // Add more orders as needed
    ];

    await this.orderRepository.save(ordersData);
  }
}
