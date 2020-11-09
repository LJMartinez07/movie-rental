import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResponseDto } from '../../shared/dtos/response/user-response.dto'
import { plainToClass } from 'class-transformer';
import { UserRepository } from '../repositories/user.respository'
// import { User } from '../../entities/user.entity'
@Injectable()
export class UserService {
    // constructor(@InjectRepository(UserRepository)
    // private userRepository: UserRepository) {
    // }
    // async getUserById(id: number): Promise<UserResponseDto> {
    //     const user = await this.findUser(id);
    //     return plainToClass(UserResponseDto, user);
    // }
    // private async findUser(id: number): Promise<User> {
    //     const user = await this.userRepository.findOne({ id });
    //     if (!user) {
    //         throw new NotFoundException(`User with id: "${id}" not found`);
    //     }
    //     return user;
    // }
}
