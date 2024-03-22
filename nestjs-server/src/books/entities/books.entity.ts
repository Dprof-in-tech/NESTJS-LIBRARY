import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  author: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  coverImage: string;

  @Column('simple-array')
  tags: string[];

  @Column({ default: true }) // Assuming all books are initially available
  available: boolean;
}
