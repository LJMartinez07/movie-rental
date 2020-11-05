import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
@Entity()
export class movie {
  @Column()
  public id: number;

  @Column()
  public backdrop_path: string;

  @Column()
  public title: string;

  @Column()
  public vote_avarage: number;

  @Column()
  public vote_count: number;

  @Column()
  public popularity: number;

  @Column()
  @CreateDateColumn()
  public created_at: Date;

  @Column()
  @UpdateDateColumn()
  public updated_at: Date;
}
export default movie;
