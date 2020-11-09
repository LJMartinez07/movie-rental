import {
    Entity,
    Column,
    Index,
    BaseEntity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { Movie } from './movie.entity';
import { User } from './user.entity';

@Index(['movie_id', 'user_id'], { unique: true })
@Entity()
export class MovieLikes extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    movie_id: number;

    @Column()
    user_id: number;

    @ManyToOne(
        type => Movie,
        movie => movie.likes,
    )
    @JoinColumn({ name: "movie_id" })
    movie: Movie;

    @ManyToOne(
        type => User,
        user => user.likes,
    )
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    @CreateDateColumn()
    public created_at: Date;

    @Column()
    @UpdateDateColumn()
    public updated_at: Date;
}
