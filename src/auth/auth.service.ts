import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Auth } from '../entities/auth.entity';
import { User } from '../entities/user.entity'
import { UserRegistrationDto } from '../shared/dtos/request/user-registration.dto';
@Injectable()
export class AuthService {
    async signUp(userRegistrationDto: UserRegistrationDto): Promise<void> {
        const {
            username,
            firstName,
            lastName,
            password,
            email,
        } = userRegistrationDto;


        return;
    }
    async login(authCredentialDto: AuthCredentialsDto): Promise<Auth> {
        const { username, password } = authCredentialDto;
        return;
    }
}
