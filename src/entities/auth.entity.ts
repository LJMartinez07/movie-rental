
import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BeforeInsert,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
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

    @ManyToOne(
        type => User,
        user => user.auths,
    )
    @JoinColumn({ name: "user_id" })
    user: User;

    @BeforeInsert()
    refreshTokenExpiration(): void {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 2);
        this.refresh_expires_at = expiresAt;
    }
    @Column()
    @CreateDateColumn()
    public created_at: Date;

    @Column()
    @UpdateDateColumn()
    public updated_at: Date;

}
