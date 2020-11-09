import * as bcrypt from 'bcryptjs';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from 'typeorm';
import { Exclude } from "class-transformer";
import { Auth } from './auth.entity'
import { Role } from './role.entity'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Index({ unique: true })
  public username: string;

  @Column()
  @Index({ unique: true })
  public email: string;

  @Column()
  public first_name: string;

  @Column()
  public last_name: string;

  @ManyToMany(type => Role)
  @JoinTable()
  roles: Role[];

  @Column()
  @Exclude()
  public password: string;

  @OneToMany(
    type => Auth,
    auth => auth.user,
  )
  auths: Auth[];

  @Column({ nullable: true })
  reset_password_token: string;

  @Column({ type: 'timestamp', nullable: true })
  reset_passwor_token_expires_in: Date;

  @Column()
  @CreateDateColumn()
  public created_at: Date;

  @Column()
  @UpdateDateColumn()
  public updated_at: Date;

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
