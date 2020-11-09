import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    AfterInsert,
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Movie } from './movie.entity';
import { User } from './user.entity';

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    movie_id: number;

    @Column()
    user_id: number;

    @Column()
    quantity: number;

    @Column({ type: 'float' })
    total: number;

    @Column({ type: 'timestamp' })
    createdAt: Date;

    @ManyToOne(
        type => Movie,
        movie => movie.orders,
    )
    movie: Movie;

    @ManyToOne(
        type => User,
        user => user.orders,
    )
    user: User;

    @BeforeInsert()
    setCreatedAt(): void {
        this.createdAt = new Date();
    }

    @AfterInsert()
    async sellMovie(): Promise<void> {
        const movie = await Movie.findOne({ id: this.movie_id });
        movie.stock -= this.quantity;
        await movie.save();
    }

    @Column()
    @CreateDateColumn()
    public created_at: Date;

    @Column()
    @UpdateDateColumn()
    public updated_at: Date;
}
