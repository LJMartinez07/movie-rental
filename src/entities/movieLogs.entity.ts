import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { Movie } from './movie.entity';

@Entity()
export class MovieLogs extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'float' })
    sale_price: number;

    @Column({ type: 'float' })
    rental_price: number;

    @Column()
    movie_id: number;

    @ManyToOne(
        type => Movie,
        movie => movie.movie_log,
    )
    @JoinColumn({ name: "movie_id" })
    movie: Movie;

    @Column()
    @CreateDateColumn()
    public created_at: Date;

    @Column()
    @UpdateDateColumn()
    public updated_at: Date;
}


