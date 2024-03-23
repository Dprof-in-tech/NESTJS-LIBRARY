import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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
  ) { }

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

    // Check if the user exists
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Check if the user has sufficient points
    if (user.points < pointsUsed) {
      throw new Error('Insufficient points');
    }

    // Check if the book exists
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new Error('Book not found');
    }

    // Deduct points from the user's account
    user.points -= pointsUsed;
    await this.userRepository.save(user);

    // Create a new order record
    const newOrder = await this.orderRepository.create({
      userId,
      bookId,
      pointsUsed,
    });
    await this.orderRepository.save(newOrder);

    // Update the book's availability status (optional)
    book.available = false;
    await this.bookRepository.save(book);

    return { message: 'Book ordered successfully' };
  }

  async cancelOrder(bookId: number, userId: number): Promise<any> {
    // Find orders with the given bookId and userId
    const orders = await this.orderRepository.find({ where: { bookId, userId } });
    if (!orders || orders.length === 0) {
      throw new Error('No orders found for the given book ID and user ID');
    }

    // Iterate through each order and cancel it
    for (const order of orders) {
      // Fetch the associated user
      const user = await this.userRepository.findOne({ where: { id: order.userId } });
      if (!user) {
        throw new Error(`User not found for order with ID ${order.id}`);
      }

      // Fetch the associated book
      const book = await this.bookRepository.findOne({ where: { id: order.bookId } });
      if (!book) {
        throw new Error(`Book not found for order with ID ${order.id}`);
      }

      // Update the book's availability status
      book.available = true;
      await this.bookRepository.save(book);

      // Refund points to the user's account
      user.points += order.pointsUsed;
      await this.userRepository.save(user);

      // Remove the order from the database
      await this.orderRepository.delete(order.id);
    }

    return { message: 'Orders canceled successfully' };
  }

  async listPurchases(userId: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Fetch all orders made by the user.
    const orders = await this.orderRepository.find({ where: { userId: userId } });

    if (orders.length === 0) {
      // Optionally handle the case where the user has no orders
      return [];
    }

    // Extract bookIds from the orders.
    // const bookIds = orders.map(order => order.bookId);

    // Retrieve books' details based on the bookIds.
    // Assuming bookId is unique and primary, find() may not accept an array of ids directly, you might need a more complex query depending on your setup, e.g., using IN operator.
    const bookIds = orders.map(order => +order.bookId); // Using unary plus operator

    const books = await this.bookRepository.findBy({ id: In(bookIds) });
    return books;
  }


}
