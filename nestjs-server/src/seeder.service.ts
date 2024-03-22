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
    // @InjectRepository(Order)
    // private readonly orderRepository: Repository<Order>,
  ) {}

  async seedDatabase() {
    await this.seedBooks();
    await this.seedUsers();
    // await this.seedOrders();
  }

  private async seedBooks() {
    const booksData = [
      {
        title: 'Book 1',
        description: 'Description of Book 1',
        author: 'Author 1',
        price: 10.99,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['fiction', 'fantasy'],
        available: true,
      },
      {
        title: 'Book 2',
        description: 'Description of Book 2',
        author: 'Author 2',
        price: 12.99,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['non-fiction', 'history'],
        available: true,
      },
      {
        title: 'Book 3',
        description: 'Description of Book 3',
        author: 'Author 3',
        price: 12.99,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['non-fiction', 'history'],
        available: true,
      },
      {
        title: 'Book 4',
        description: 'Description of Book 4',
        author: 'Author 4',
        price: 12.99,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['non-fiction', 'history'],
        available: true,
      },
      {
        title: 'Book 5',
        description: 'Description of Book 5',
        author: 'Author 5',
        price: 12.99,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['non-fiction', 'history'],
        available: true,
      },
      {
        title: 'Book 6',
        description: 'Description of Book 6',
        author: 'Author 6',
        price: 12.99,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        tags: ['non-fiction', 'history'],
        available: true,
      },
      // Add more books as needed
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

//   private async seedOrders() {
//     // Assuming each order is associated with a user and contains one or more books
//     const ordersData = [
//       {
//         user: { id: 1 }, // Assuming user with ID 1 exists
//         books: [{ id: 1 }, { id: 2 }], // Assuming books with IDs 1 and 2 exist
//         // Other order data
//       },
//       // Add more orders as needed
//     ];

//     await this.orderRepository.save(ordersData);
//   }
}
