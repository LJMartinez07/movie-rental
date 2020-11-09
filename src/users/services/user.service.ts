import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.respository'
import { User } from '../../entities/user.entity'
import { ApiResponse } from 'src/shared/response/ApiResponse';
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserRepository)
    private userRepository: UserRepository) {
    }
    async getUserById(id: number) {
        const user = await this.findUser(id);
        delete user.password;
        delete user.reset_password_token;
        return new ApiResponse('API_SUCCESS', user);
    }
    private async findUser(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ id });
        if (!user) {
            throw new NotFoundException(`User with id: "${id}" not found`);
        }
        return user;
    }
}
