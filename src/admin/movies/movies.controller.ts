import { Controller, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieService } from '../../movies/services/movie.service'
import { ApiResponse } from '../../shared/response/ApiResponse';
import { CheckTokenGuard } from '../../shared/guards/check-token.guard';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../shared/decorators/get-user.decorator';
import { AuthorizedUser } from '../../shared/interfaces/authorized-user.interface';
import { routes } from '../../constants/routes';
import { RoleGuard } from '../../shared/guards/role.guard';
import { Roles } from '../../shared/decorators/role.decorator';
import { UserRoles } from '../../constants/userRoles';
@UseGuards(AuthGuard(), CheckTokenGuard, RoleGuard)
@Controller(routes.adminMovies)
@Roles('admin')
export class MoviesController {
    constructor(private moviesService: MovieService) { }
    @Post()
    createMovie(
        @GetUser() user: AuthorizedUser,
        @Body(ValidationPipe) createMovieDto: CreateMovieDto,
    ): Promise<ApiResponse> {
        return this.moviesService.storeMovie(createMovieDto);
    }

}
