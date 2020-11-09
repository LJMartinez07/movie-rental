import {
    Controller,
    Get,
    UseGuards,
    Query,
} from '@nestjs/common';
import { PaginationDto } from 'src/shared/dtos/request/pagination.dto';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { AuthorizedUser } from 'src/shared/interfaces/authorized-user.interface';
import { CheckTokenGuard } from 'src/shared/guards/check-token.guard';
import { routes } from 'src/constants/routes';
import { MovieService } from './services/movie.service';
import { ApiResponse } from 'src/shared/response/ApiResponse';
import { MovieFilterDto } from 'src/shared/dtos/request/filters/movie-filter.dto';


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

}
