import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    UpdateDateColumn,
    BaseEntity,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm';
import { Movie } from './movie.entity'
@Entity()
export class MovieImages extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public path: string;

    @Column()
    movie_id: number;

    @ManyToOne(() => Movie, movie => movie.images)
    @JoinColumn({ name: "movie_id" })
    movie: Movie

    @Column()
    @CreateDateColumn()
    public created_at: Date;

    @Column()
    @UpdateDateColumn()
    public updated_at: Date;
}
