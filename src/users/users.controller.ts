import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizedUser } from '../shared/interfaces/authorized-user.interface';
import { UserService } from './services/user.service'
import { UserResponseDto } from '../shared/dtos/response/user-response.dto';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
    // constructor(private userService: UserService) { }
    // @Get('profile')
    // async getMyProfile(user: AuthorizedUser,
    // ): Promise<UserResponseDto> {
    //     return this.userService.getUserById(user.user_id);
    // }
}
