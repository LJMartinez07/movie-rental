import { Expose, Exclude } from 'class-transformer';
import { Role } from '../../../entities/role.entity';

@Exclude()
export class UserResponseDto {
    @Expose()
    id: number;

    @Expose()
    username: string;

    @Expose()
    first_name: string;

    @Expose()
    last_name: string;

    @Expose()
    email: string;

    @Expose()
    roles: Role[];
}
