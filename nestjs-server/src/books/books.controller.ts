import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginDto } from './dto/loginUser.dto';
import { CreateOrderDto } from './dto/createOrder.dto'; // Add the CreateOrderDto import
import { BookService } from './books.service';

@ApiTags('Bookstore')
@Controller('bookstore')
export class BookstoreController {
  constructor(private readonly bookService: BookService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  async registerUser(@Body() userData: CreateUserDto) {
    return await this.bookService.registerUser(userData);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login as a user' })
  @ApiBody({ type: LoginDto })
  async loginUser(@Body() loginData: LoginDto) {
    return await this.bookService.loginUser(loginData);
  }

  @Get('library')
  @ApiOperation({ summary: 'Get all books in the library' })
  async getAllBooks() {
    return await this.bookService.getAllBooks();
  }

  @Get('books/:id')
  @ApiOperation({ summary: 'Get a book by its ID' })
  @ApiParam({ name: 'id', type: 'number' })
  async getBookById(@Param('id') id: number) {
    return await this.bookService.getBookById(id);
  }

  @Post('books/:id/order') // Change the endpoint to 'order' instead of 'buy'
  @ApiOperation({ summary: 'Order a book' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: CreateOrderDto }) // Use CreateOrderDto for the request body
  async orderBook(@Param('id') id: number, @Body() orderData: CreateOrderDto) {
    return await this.bookService.orderBook(id, orderData); // Pass the book ID along with order data
  }

  @Delete('orders/:id')
  @ApiOperation({ summary: 'Cancel an order' })
  @ApiParam({ name: 'id', type: 'number' })
  async cancelOrder(@Param('id') bookId: number, @Param('userId') userId: number) {
    // Call the BookService's cancelOrder method with both the bookId and userId
    return await this.bookService.cancelOrder(bookId, userId);
  }
  

  @Get('purchases/:userId')
  @ApiOperation({ summary: 'List purchases for a user' })
  @ApiParam({ name: 'userId', type: 'number' })
  async listPurchases(@Param('userId') userId: number) {
    return await this.bookService.listPurchases(userId);
  }
}
