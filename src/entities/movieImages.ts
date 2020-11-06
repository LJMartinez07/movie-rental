import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from 'typeorm';
import { movie } from './movie'
@Entity()
export class movieImages {
    @Column()
    public id: number;

    @Column()
    public path: string;

    @ManyToOne(() => movie, movie => movie.images)
    movie: movie


    @Column()
    @CreateDateColumn()
    public created_at: Date;

    @Column()
    @UpdateDateColumn()
    public updated_at: Date;
}
export default movie;
