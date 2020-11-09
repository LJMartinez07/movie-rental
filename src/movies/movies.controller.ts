import {
    Controller,
    Get,
    UseGuards,
    Post,
    Query,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { PaginationDto } from '../shared/dtos/request/pagination.dto';
import { GetUser } from '../shared/decorators/get-user.decorator';
import { AuthorizedUser } from '../shared/interfaces/authorized-user.interface';
import { CheckTokenGuard } from '../shared/guards/check-token.guard';
import { routes } from '../constants/routes';
import { MovieService } from './services/movie.service';
import { ApiResponse } from '../shared/response/ApiResponse';
import { MovieFilterDto } from '../shared/dtos/request/filters/movie-filter.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller(routes.movies)
@UseGuards(CheckTokenGuard)
export class MoviesController {
    constructor(private movieService: MovieService) {
    }

    @Get()
    getMovies(
        @Query() paginationDto: PaginationDto,
        @Query() MovieFilterDto: MovieFilterDto,
        @GetUser() user?: AuthorizedUser,
    ): Promise<ApiResponse> {
        return this.movieService.getMovies(paginationDto, MovieFilterDto, user);
    }

    @Post(':id/like')
    @UseGuards(AuthGuard(), CheckTokenGuard)
    likeMovie(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: AuthorizedUser
    ): Promise<ApiResponse> {
        return this.movieService.likeMovie(id, user)
    }

}
