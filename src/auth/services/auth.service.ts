import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../users/repositories/user.respository'
import { AuthRepository } from '../repositories/auth.respository'
import { UserRegistrationDto } from '../../shared/dtos/request/user-registration.dto';
import { JwtPayload } from '../jwt-payload.interface';
import { ApiResponse } from '../../shared/response/ApiResponse';
import { UserRoles } from 'src/constants/userRoles';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository,
        private jwtService: JwtService) {

    }
    async register(userRegistrationDto: UserRegistrationDto) {
        const user = await this.userRepository.register(userRegistrationDto);
        return new ApiResponse('API_SUCCESS', user, 'user has been created');
    }
    async login(authCredentialDto: AuthCredentialsDto) {
        const { user_id, username, roles } = await this.userRepository.validateUserPassword(
            authCredentialDto,
        );
        const payload: JwtPayload = { username, roles: roles.map(r => r as UserRoles), };
        const accessToken = this.jwtService.sign(payload);
        const data = await this.authRepository.login(accessToken, user_id);
        return new ApiResponse('API_SUCCESS', data, 'user authenticated');
    }

    async logout() {
        return new ApiResponse('API_SUCCESS', null, 'user logout');
    }

    async refreshToken(refresh_token: string) {
        const token = await this.authRepository.findRefreshAndValidate(
            refresh_token,
        );
        const user = token.user;
        const payload: JwtPayload = { username: user.username, roles: user.roles.map(r => r.label as UserRoles), };
        const accessToken = this.jwtService.sign(payload);
        this.authRepository.delete(token);
        const data = await this.authRepository.login(accessToken, user.id);
        return new ApiResponse('API_SUCCESS', data, 'token has been refresh');
    }
}
