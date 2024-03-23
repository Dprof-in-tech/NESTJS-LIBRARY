import { Test, TestingModule } from '@nestjs/testing';
import { BookstoreController } from './books.controller';
import { BookService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/books.entity';
import { User } from './entities/user.entity';
import { Order } from './entities/order.entity';

describe('BooksController', () => {
  let controller: BookstoreController;
  let bookService: BookService;
  let bookRepository;
  let userRepository;
  let orderRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookstoreController],
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Order),
          useValue: {},
        },
        
      ],
    }).compile();

    controller = module.get<BookstoreController>(BookstoreController);
    bookService = module.get<BookService>(BookService);
    bookRepository = module.get(getRepositoryToken(Book));
    userRepository = module.get(getRepositoryToken(User));
    orderRepository = module.get(getRepositoryToken(Order));
  });

  
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should register a new user', async () => {
    const createUserDto = { fullName: 'John Doe', email: 'john@example.com', password: 'password' };
    const registeredUser = { id: 1, ...createUserDto, points: 100 };
    jest.spyOn(bookService, 'registerUser').mockResolvedValue(registeredUser);

    const result = await controller.registerUser(createUserDto);

    expect(result).toBe(registeredUser);
  });

  it('should login a user', async () => {
    const loginDto = { email: 'john@example.com', password: 'password' };
    const loggedInUser = {
      id: 1,
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'password',
      points: 100,
  };
    jest.spyOn(bookService, 'loginUser').mockResolvedValue(loggedInUser);

    const result = await controller.loginUser(loginDto);

    expect(result).toBe(loggedInUser);
  });

  it('should fetch all books', async () => {
    const books: Book[] = [
      {
        id: 1,
        title: 'Book 1',
        author: 'Author 1',
        price: 10,
        description: 'Description of Book 1',
        coverImage: 'cover-image-url',
        tags: ['fiction', 'fantasy'],
        available: true,
      },
      // Add more books as needed
    ];
    
    jest.spyOn(bookService, 'getAllBooks').mockResolvedValue(books);

    const result = await controller.getAllBooks();

    expect(result).toBe(books);
  });

  it('should fetch a book by its ID', async () => {
    const bookId = 1;
    const book = {
      id: 1,
      title: 'Book 1',
      author: 'Author 1',
      price: 10,
      description: 'Description of Book 1',
      coverImage: 'cover-image-url',
      tags: ['fiction', 'fantasy'],
      available: true,
    }
    jest.spyOn(bookService, 'getBookById').mockResolvedValue(book);

    const result = await controller.getBookById(bookId);

    expect(result).toBe(book);
  });
  it('should cancel an order', async () => {
    const orderId = 1;
    const cancelResult = { message: 'Order canceled successfully' };
    jest.spyOn(bookService, 'cancelOrder').mockResolvedValue(cancelResult);

    const result = await controller.cancelOrder(orderId);

    expect(result).toBe(cancelResult);
  });

  it('should list purchases for a user', async () => {
    // Sample user ID for testing
    const userId = 1;
    // Sample list of purchases
    const purchases = [
      { id: 1, userId: userId, bookId: 1, pointsUsed: 50 },
      { id: 2, userId: userId, bookId: 2, pointsUsed: 75 },
      // Add more purchases as needed
    ];

    // Mock the behavior of the listPurchases method
    jest.spyOn(bookService, 'listPurchases').mockImplementation(async (userId: number) => {
      // Assuming listPurchases fetches data from the repository, we can mock it like this:
      return purchases; // Return the sample list of purchases
    });

    // Call the endpoint
    const result = await controller.listPurchases(userId);

    // Assertions
    expect(result).toEqual(purchases); // Assert that the result matches the mocked purchases
    expect(bookService.listPurchases).toHaveBeenCalledWith(userId); // Assert that listPurchases was called with the correct userId
  });
  
  it('should order a book successfully', async () => {
    const userId = 1;
    const bookId = 1;
    const pointsUsed = 100;
    const orderResponse = { message: 'Book ordered successfully' };

    const orderBookDto = {
      userId,
      pointsUsed,
      bookId,
    };

    jest.spyOn(bookService, 'orderBook').mockResolvedValue(orderResponse);

    const result = await controller.orderBook(bookId, orderBookDto);

    expect(result).toEqual(orderResponse);
    expect(bookService.orderBook).toHaveBeenCalledWith(bookId, orderBookDto);
    console.log(orderBookDto);
  });
});


