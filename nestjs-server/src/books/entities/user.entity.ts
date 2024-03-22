import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 100 }) // Default value for points is 100
  points: number;

  @Column({ nullable: true }) // Assuming fullName is optional
  fullName: string;
}
