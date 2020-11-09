import { Module } from '@nestjs/common';
import { UserRepository } from '../users/repositories/user.respository'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthRepository } from './repositories/auth.respository';
import { AuthService } from './services/auth.service'
require('dotenv').config();
@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([UserRepository, AuthRepository]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRATION_TIME,
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [PassportModule],
})
export class AuthModule { }
