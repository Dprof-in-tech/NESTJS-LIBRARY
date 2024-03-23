import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/books.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginDto } from './dto/loginUser.dto';
import { CreateOrderDto } from './dto/createOrder.dto';
import { User } from './entities/user.entity';
import { Order } from './entities/order.entity'; // Import Order entity

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Order) // Inject OrderRepository
    private readonly orderRepository: Repository<Order>,
  ) {}

  async registerUser(userData: CreateUserDto): Promise<User> {
    // Assuming User entity has been defined properly
    const user = new User();
    user.fullName = userData.fullName;
    user.email = userData.email;
    user.password = userData.password;
    user.points = 100; // Assigning 100 points to newly registered users
    return await this.userRepository.save(user);
  }

  async loginUser(loginData: LoginDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email: loginData.email, password: loginData.password } });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    return user;
  }

  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async getBookById(id: number): Promise<Book> {
    return await this.bookRepository.findOne({ where: { id } });
  }
  
  async orderBook(bookId: number, createOrderDto: CreateOrderDto): Promise<any> {
    const { userId, pointsUsed } = createOrderDto;
    const user = await this.userRepository.findOne({ where: {id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    if (user.points < pointsUsed) {
      throw new Error('Insufficient points');
    }
    const book = await this.bookRepository.findOne({ where: {id: bookId } });
    if (!book) {
      throw new Error('Book not found');
    }
    // Deduct points from user's account
    user.points -= pointsUsed;
    await this.userRepository.save(user);
    // Implement logic to mark the book as ordered
    // For simplicity, let's assume the book's availability status is updated
    book.available = true;
    await this.bookRepository.save(book);
    return { message: 'Book ordered successfully' };
  }

  async cancelOrder(orderId: number): Promise<any> {
    // Fetch the order by its ID
    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) {
      throw new Error('Order not found');
    }
    
    // Fetch the associated user and book
    const user = await this.userRepository.findOne({ where: { id: order.userId } });
    if (!user) {
      throw new Error('User not found');
    }
    const book = await this.bookRepository.findOne({ where: { id: order.bookId } });
    if (!book) {
      throw new Error('Book not found');
    }

    // Implement logic to cancel the order
    // For simplicity, let's assume the book's availability status is updated
    book.available = true;
    await this.bookRepository.save(book);

    // Refund points to the user's account
    user.points += order.pointsUsed;
    await this.userRepository.save(user);

    // Remove the order from the database
    await this.orderRepository.delete(orderId);

    return { message: 'Order canceled successfully' };
}

  async listPurchases(userId: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: {id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    // Implement logic to list purchases made by the user
    // For simplicity, let's assume we return a list of ordered books
    const purchases = await this.bookRepository.find({ where: {id: userId } });
    return purchases;
  }
}
