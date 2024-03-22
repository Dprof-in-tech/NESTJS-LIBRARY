import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The full name of the user' })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ description: 'The email address of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password for the user (minimum length: 6 characters)' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
