import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('BookController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/books (POST)', () => {
    return request(app.getHttpServer())
      .post('/books')
      .send({
        title: 'Test Book',
        author: 'Test Author',
        description: 'Test Description',
        price: 10,
        coverImage: 'test-cover.jpg',
        tag: 'fiction',
      })
      .expect(201); // Assuming 201 is the status code for successfully creating a resource
  });

  it('/books (GET)', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200) // Assuming 200 is the status code for successful response
      .expect('Content-Type', /json/); // Assuming the response content type is JSON
  });

  // Add more test cases for other routes like GET /books/:id, PUT /books/:id, DELETE /books/:id
});
