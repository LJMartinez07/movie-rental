import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './repositories/user.respository'
import { UsersController } from './users.controller'
import { UserService } from './services/user.service'
@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([UserRepository])],
    controllers: [UsersController],
    providers: [UserService],
})
export class UsersModule { }
