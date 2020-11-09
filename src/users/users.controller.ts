import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizedUser } from '../shared/interfaces/authorized-user.interface';
import { UserService } from './services/user.service'
import { ApiResponse } from 'src/shared/response/ApiResponse';
import { CheckTokenGuard } from 'src/shared/guards/check-token.guard'
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { routes } from 'src/constants/routes';
@Controller(routes.users)
@UseGuards(AuthGuard(), CheckTokenGuard)
export class UsersController {
    constructor(private userService: UserService) { }
    @Get('profile')
    async getMyProfile(@GetUser() user: AuthorizedUser,
    ): Promise<ApiResponse> {
        return this.userService.getUserById(user.user_id);
    }
}
