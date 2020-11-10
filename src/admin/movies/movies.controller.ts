import { Controller, Post, Body, ValidationPipe, UseGuards, ParseIntPipe, Put, Param, Delete, Patch } from '@nestjs/common';
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
import { UpdateMovieDto } from './dto/update-movie.dto';
@UseGuards(AuthGuard(), CheckTokenGuard, RoleGuard)
@Controller(routes.adminMovies)
@Roles(UserRoles.ADMIN)
export class MoviesController {
    constructor(private moviesService: MovieService) { }
    @Post()
    createMovie(
        @GetUser() user: AuthorizedUser,
        @Body(ValidationPipe) createMovieDto: CreateMovieDto,
    ): Promise<ApiResponse> {
        return this.moviesService.storeMovie(createMovieDto);
    }


    @Put('/:id')
    updateMovie(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateMovieDto: UpdateMovieDto,
    ): Promise<ApiResponse> {
        return this.moviesService.updateMovie(id, updateMovieDto);
    }

    @Patch('/:id/availability')
    updateAvailability(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ApiResponse> {
        return this.moviesService.updateAvailability(id);
    }

    @Delete('/:id')
    deleteMovie(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse> {
        return this.moviesService.deleteMovie(id);
    }

}
