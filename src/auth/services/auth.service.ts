import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { Auth } from '../../entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../users/repositories/user.respository'
import { AuthRepository } from '../repositories/auth.respository'
import { UserRegistrationDto } from '../../shared/dtos/request/user-registration.dto';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository,
        private jwtService: JwtService) {

    }
    async register(userRegistrationDto: UserRegistrationDto): Promise<void> {
        const user = await this.userRepository.register(userRegistrationDto);
        return;
    }
    async login(authCredentialDto: AuthCredentialsDto): Promise<Auth> {
        const { user_id, username } = await this.userRepository.validateUserPassword(
            authCredentialDto,
        );
        const payload = { username };
        const accessToken = this.jwtService.sign(payload);
        return await this.authRepository.login(accessToken, user_id);
    }

    async logout(): Promise<void> {

    }
}
