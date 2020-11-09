import { EntityRepository, Repository } from 'typeorm';
import { Auth } from '../../entities/auth.entity';
const randtoken = require('rand-token');
import {
    InternalServerErrorException,
    ForbiddenException
} from '@nestjs/common';
@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {
    async login(access_token: string, user_id: number): Promise<Auth> {
        try {
            const auth = new Auth();
            auth.access_token = access_token;
            auth.user_id = user_id;
            auth.refresh_token = randtoken.generate(18)
            await auth.save();
            return auth;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
    async findRefreshAndValidate(refresh_token: string): Promise<Auth> {
        const today = new Date();
        const todayMs = today.getTime();

        const token = await this.findOne({ refresh_token }, { relations: ['user'] });
        const expiredToken = () => {
            const expirationMs = token.refresh_expires_at.getTime();
            return token && expirationMs < todayMs;
        };

        if (!token || expiredToken()) {
            throw new ForbiddenException(`Invalid/Expired Token`);
        }

        return token;
    }
}
