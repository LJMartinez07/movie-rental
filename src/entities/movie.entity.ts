import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
  DeleteDateColumn
} from 'typeorm';
import { MovieImages } from './movieImages.entity';
import { MovieLogs } from './movieLogs.entity';
import { MovieLikes } from './movieLikes.entity';
import { Order } from './order.entity';
import { Rental } from './rental.entity';
@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string

  @OneToMany(() => MovieImages, (image) => image.movie)
  images: MovieImages[];

  @Column()
  stock: number;

  @Column({ default: 0 })
  on_rent: number;

  @Column({ default: true })
  availability: boolean;

  @Column({ type: 'float' })
  rental_price: number;

  @Column({ type: 'float' })
  sale_price: number;


  @OneToMany(
    type => MovieLogs,
    movie_log => movie_log.movie,
  )
  movie_log: MovieLogs[];

  @OneToMany(
    type => MovieLikes,
    like => like.movie,
  )
  likes: MovieLikes[];

  @OneToMany(
    type => Rental,
    rentals => rentals.movie,
  )
  rentals: Rental[];

  @OneToMany(
    type => Order,
    orders => orders.movie,
  )
  orders: Order[];

  @Column()
  @CreateDateColumn()
  public created_at: Date;

  @Column()
  @UpdateDateColumn()
  public updated_at: Date;

  @Column()
  @DeleteDateColumn()
  public deleted_at: Date;
}
