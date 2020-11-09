import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/repositories/user.respository';
import { AuthorizedUser } from 'src/shared/interfaces/authorized-user.interface';
import { JwtPayload } from './jwt-payload.interface';
require('dotenv').config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: JwtPayload): Promise<AuthorizedUser> {
        const { username } = payload;
        const user = await this.userRepository.findOne(
            { username },
            { relations: ['roles'] },
        );
        if (!user) {
            throw new UnauthorizedException();
        }
        const role_names: string[] = user.roles.map(role => role.label);
        return { user_id: user.id, username, roles: role_names };
    }
}
