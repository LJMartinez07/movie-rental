import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { movieImages } from './movieImages';
@Entity()
export class movie {
  @Column()
  public id: number;

  @Column()
  public title: string;

  @OneToMany(() => movieImages, (image) => image.movie)
  images: movieImages[];

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
