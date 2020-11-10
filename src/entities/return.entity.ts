import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    AfterInsert,
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { Rental } from './rental.entity';

@Entity()
export class Return extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rental_id: number;

    @Column({ type: 'float', default: 0 })
    penalty: number;

    @OneToOne(type => Rental)
    @JoinColumn({ name: "rental_id" })
    rental: Rental;

    @Column()
    @CreateDateColumn()
    public created_at: Date;

    @Column()
    @UpdateDateColumn()
    public updated_at: Date;

    @AfterInsert()
    async retunMovieToStock(): Promise<void> {
        const rental = await Rental.createQueryBuilder('rental_o')
            .where('rental_o.id = :id', { id: this.rental_id })
            .leftJoinAndSelect('rental_o.movie', 'p', 'p.id = rental_o.movie_id ')
            .getOne();
        const movie = await Movie.findOne({ id: rental.movie_id });
        movie.stock += 1;
        movie.on_rent -= 1;
        await movie.save();
    }
}
