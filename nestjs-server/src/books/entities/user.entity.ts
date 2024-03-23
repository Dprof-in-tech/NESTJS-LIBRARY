import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 100, type: 'decimal', precision: 10, scale: 2 })
  points: number;

  @Column({ nullable: true })
  fullName: string;
}
