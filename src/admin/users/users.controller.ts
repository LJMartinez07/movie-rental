import { Body, Controller, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '../../shared/response/ApiResponse';
import { UserService } from '../../users/services/user.service';
import { routes } from '../../constants/routes';
import { UserRoles } from '../../constants/userRoles';
import { GetUser } from '../../shared/decorators/get-user.decorator';
import { Roles } from '../../shared/decorators/role.decorator';
import { CheckTokenGuard } from '../../shared/guards/check-token.guard';
import { RoleGuard } from '../../shared/guards/role.guard';
import { AuthorizedUser } from '../../shared/interfaces/authorized-user.interface';
import { RolesArrValidatorPipe } from './pipes/roles-arr-validator.pipe';

@UseGuards(AuthGuard(), CheckTokenGuard, RoleGuard)
@Controller(routes.adminUsers)
@Roles(UserRoles.ADMIN)
export class UsersController {
    constructor(private userService: UserService) { }
    @Patch('/:id/roles')
    async updateUserRoles(
        @Param('id', ParseIntPipe) id: number,
        @Body('roles', RolesArrValidatorPipe) roles: string[]
    ): Promise<ApiResponse> {
        return this.userService.updateUserRoles(id, roles);
    }
}
