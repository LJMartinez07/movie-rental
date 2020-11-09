import { EntityRepository, Repository } from 'typeorm';
import {
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
    Logger,
    BadRequestException,
} from '@nestjs/common';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { User } from '../../entities/user.entity';
import { AuthorizedUser } from 'src/shared/interfaces/authorized-user.interface';
import { PaginationDto } from 'src/shared/dtos/request/pagination.dto';
import { UserRegistrationDto } from 'src/shared/dtos/request/user-registration.dto';
import { Role } from '../../entities/role.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    constructor(private logger: Logger) {
        super();
    }
    async getAllUsers(
        paginationDto: PaginationDto,
    ): Promise<{
        data: User[];
        totalCount: number;
    }> {
        const page = paginationDto.page || 1;
        const limit = paginationDto.limit || 10;
        const skip = (page - 1) * limit;
        const [users, totalCount] = await this.createQueryBuilder('user')
            .take(limit)
            .skip(skip)
            .getManyAndCount();

        return { data: users, totalCount: totalCount };
    }

    async register(userRegistrationDto: UserRegistrationDto): Promise<User> {
        try {
            const {
                username,
                first_name,
                last_name,
                password,
                email,
            } = userRegistrationDto;
            const user = this.create();
            user.username = username;
            user.first_name = first_name;
            user.last_name = last_name;
            user.email = email;
            user.password = password;
            user.hashPassword()
            await user.save();
            delete user.password;
            return user;
        } catch (error) {
            console.log(error.code)
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Username or email already exist');
            } else {
                throw new InternalServerErrorException();
            }
        }


    }

    async resetPassword(token: string, newPassword: string): Promise<void> {
        try {
            const user = await this.findOne({ reset_password_token: token });
            const today = new Date().getTime();

            if (!user) {
                throw new BadRequestException(`Invalid Token`);
            }

            const resetPasswordExpirationDateTime = user.reset_passwor_token_expires_in.getTime();

            if (today > resetPasswordExpirationDateTime) {
                throw new BadRequestException('Invalid Token');
            }

            user.password = newPassword;
            user.hashPassword()
            user.reset_password_token = null;
            user.reset_passwor_token_expires_in = null;
            await user.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async updateUserRole(id: number, roles: string[]): Promise<User> {
        const user = await this.findOne({ id });
        const mappedRoles = await Promise.all(
            roles.map(async role => {
                const found = await Role.findOne({ label: role });
                return found;
            }),
        );

        user.roles = mappedRoles;

        try {
            await user.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return user;
    }


    async validateUserPassword(
        authCredentialsDto: AuthCredentialsDto,
    ): Promise<AuthorizedUser> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username }, { relations: ['roles'] });
        if (user && (await user.checkIfUnencryptedPasswordIsValid(password))) {
            const role_names: string[] = user.roles.map(role => role.label);
            return { user_id: user.id, username, roles: role_names };
        } else {
            throw new NotFoundException(`Invalid username or password`);
        }
    }
}
