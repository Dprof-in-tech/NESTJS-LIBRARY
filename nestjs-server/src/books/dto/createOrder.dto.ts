import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ description: 'The ID of the user who is ordering the book' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  userId: number;

  @ApiProperty({ description: 'The number of points used for the purchase' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  pointsUsed: number;

  @ApiProperty({ description: 'The ID of the book being ordered' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  bookId: number;
 
}
