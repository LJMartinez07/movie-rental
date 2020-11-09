import { EntityRepository, Repository } from 'typeorm';
import { Auth } from '../../entities/auth.entity';
import {
    InternalServerErrorException,
} from '@nestjs/common';
@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {
    async login(access_token: string, user_id: number): Promise<Auth> {
        try {
            const auth = new Auth();
            auth.access_token = access_token;
            auth.user_id = user_id;
            await auth.save();
            return auth;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
