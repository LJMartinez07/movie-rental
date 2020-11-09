
import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BeforeInsert,
    JoinColumn
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

    @Column()
    refresh_token: string;

    @Column({ type: 'timestamp' })
    refresh_expires_at: Date;

    @BeforeInsert()
    refreshTokenExpiration(): void {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 2);
        this.refresh_expires_at = expiresAt;
    }

    @ManyToOne(
        type => User,
        user => user.auths,
    )
    @JoinColumn({ name: "user_id" })
    user: User;
}
