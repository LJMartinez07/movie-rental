import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    AfterInsert,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { Movie } from './movie.entity';

@Entity()
export class Rental extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    movie_id: number;

    @Column({ type: 'float' })
    total: number;

    @Column({ type: 'timestamp' })
    rented_at: Date;

    @Column({ type: 'timestamp' })
    returned_at: Date;

    @ManyToOne(
        type => Movie,
        movie => movie.rental,
        { eager: true },
    )
    @JoinColumn({ name: "movie_id" })
    @Transform(movie => movie.name)
    movie: Movie;


    @Column()
    @CreateDateColumn()
    public created_at: Date;

    @Column()
    @UpdateDateColumn()
    public updated_at: Date;

    @AfterInsert()
    async rentMovie(): Promise<void> {
        const movie = await Movie.findOne({ id: this.movie_id });
        movie.stock -= 1;
        movie.on_rent += 1;
        await movie.save();
    }

}
