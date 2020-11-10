import { Body, Controller, ParseIntPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../shared/decorators/role.decorator';
import { UserRoles } from '../../constants/userRoles';
import { CheckTokenGuard } from '../../shared/guards/check-token.guard';
import { RoleGuard } from '../../shared/guards/role.guard';
import { GetUser } from '../../shared/decorators/get-user.decorator';
import { AuthorizedUser } from '../../shared/interfaces/authorized-user.interface';
import { OrderService } from './services/order.service';
import { ApiResponse } from 'src/shared/response/ApiResponse';
import { routes } from 'src/constants/routes';

@Controller(routes.customerBuy)
@UseGuards(AuthGuard(), CheckTokenGuard, RoleGuard)
@Roles(UserRoles.CUSTOMER)
export class OrdersController {
    constructor(private orderService: OrderService) { }
    @Post()
    buyMovie(
        @Body('movie_id', ParseIntPipe) movie_id: number,
        @Body('quantity', ParseIntPipe) quantity: number,
        @GetUser() user: AuthorizedUser,
    ): Promise<ApiResponse> {
        return this.orderService.buyMovie({ movie_id, quantity }, user);
    }
}
