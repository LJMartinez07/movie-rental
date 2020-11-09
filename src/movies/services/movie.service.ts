import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieFilterDto } from 'src/shared/dtos/request/filters/movie-filter.dto';
import { PaginationDto } from 'src/shared/dtos/request/pagination.dto';
import { AuthorizedUser } from 'src/shared/interfaces/authorized-user.interface';
import { ApiResponse } from 'src/shared/response/ApiResponse';
import { LikeRepository } from '../repositories/like.repository';
import { MovieRepository } from '../repositories/movie.repository'

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(MovieRepository)
        private movieRepository: MovieRepository,
        @InjectRepository(LikeRepository)
        private likeRepository: LikeRepository,
    ) {
    }
    async getMovies(
        paginationDto: PaginationDto,
        MovieFilterDto: MovieFilterDto,
        user?: AuthorizedUser,
    ) {

        const { movies, total } = await this.movieRepository.getMovies(
            paginationDto,
            MovieFilterDto,
        );


        const page = Number(paginationDto.page) || 1;
        const limit = Number(paginationDto.limit) || 10;
        return new ApiResponse('API_SUCCESS', {
            movies,
            total,
            page,
            limit,
            user_roles: user?.roles,
        })
    }

    async likeMovie(movie_id: number, user: AuthorizedUser) {
        const userLike = await this.likeRepository.findOne({
            movie_id,
            user_id: user.user_id,
        });

        if (!userLike) {
            await this.likeRepository.save({ movie_id, user_id: user.user_id });
            return new ApiResponse('API_SUCCESS', null, 'like has been saved');
        }
        await this.likeRepository.delete({ movie_id, user_id: user.user_id });
        return new ApiResponse('API_SUCCESS', null, 'like has been removed');
    }

}
