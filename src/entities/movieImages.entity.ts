import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn, BaseEntity } from 'typeorm';
import { Movie } from './movie.entity'
@Entity()
export class MovieImages extends BaseEntity {
    @Column()
    public id: number;

    @Column()
    public path: string;

    @ManyToOne(() => Movie, movie => movie.images)
    movie: Movie


    @Column()
    @CreateDateColumn()
    public created_at: Date;

    @Column()
    @UpdateDateColumn()
    public updated_at: Date;
}
export default movie;
