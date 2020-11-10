import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { routes } from 'src/constants/routes';
import { UserRoles } from 'src/constants/userRoles';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { Roles } from 'src/shared/decorators/role.decorator';
import { CheckTokenGuard } from 'src/shared/guards/check-token.guard';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { ApiResponse } from 'src/shared/response/ApiResponse';
import { AuthorizedUser } from '../../shared/interfaces/authorized-user.interface';
import { RentalDto } from './dto/rental.dto';
import { RentalService } from './services/rental.service'
@Controller(routes.customerRental)
@UseGuards(AuthGuard(), CheckTokenGuard, RoleGuard)
@Roles(UserRoles.CUSTOMER)
export class RentalsController {
    constructor(private rentalService: RentalService) { }

    @Post()
    rentMovie(
        @Body() rentDto: RentalDto,
        @GetUser() user: AuthorizedUser,
    ): Promise<ApiResponse> {
        return this.rentalService.rentMovie(rentDto, user);
    }
    @Post('/:id/return')
    returnMovie(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: AuthorizedUser,
    ): Promise<ApiResponse> {
        return this.rentalService.returnMovie(id, user);
    }
}
