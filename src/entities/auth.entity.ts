import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Auth extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    accessToken: string;

    @ManyToOne(
        type => User,
        user => user.auths,
    )
    user: User;
}