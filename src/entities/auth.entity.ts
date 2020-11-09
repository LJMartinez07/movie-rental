
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
    user_id: number;

    @Column()
    access_token: string;

    @Column({ type: 'timestamp' })
    refresh_expires_at: Date;

    @ManyToOne(
        type => User,
        user => user.auths,
    )
    user: User;
}
