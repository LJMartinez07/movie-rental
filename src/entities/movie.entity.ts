import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  OneToMany,
  BaseEntity
} from 'typeorm';
import { MovieImages } from './movieImages.entity';
@Entity()
export class Movie extends BaseEntity {
  @Column()
  public id: number;

  @Column()
  public title: string;

  @OneToMany(() => MovieImages, (image) => image.movie)
  images: MovieImages[];

  @Column()
  stock: number;

  @Column({ default: 0 })
  onRent: number;

  @Column({ default: true })
  availability: boolean;

  @Column({ type: 'float' })
  rental_price: number;

  @Column({ type: 'float' })
  sale_price: number;

  @Column()
  @CreateDateColumn()
  public created_at: Date;

  @Column()
  @UpdateDateColumn()
  public updated_at: Date;
}
export default movie;
