import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Auth } from '../../entities/auth.entity';

@Injectable()
export class CheckTokenGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { headers } = context.switchToHttp().getRequest();
        let token = headers.authorization;

        if (!token) {
            return true;
        }

        token = token.split(' ')[1];
        const found = await Auth.findOne({ access_token: token });

        if (!found) {
            throw new ForbiddenException(`Invalid/Expired Token`);
        }

        return true;
    }
}
