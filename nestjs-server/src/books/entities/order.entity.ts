import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the order' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The ID of the user who placed the order' })
  userId: number;

  @Column()
  @ApiProperty({ description: 'The ID of the book being ordered' })
  bookId: number;

  @Column()
  @ApiProperty({ description: 'The number of points used for the order' })
  pointsUsed: number;

  

}
