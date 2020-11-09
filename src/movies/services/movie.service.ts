import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from 'src/admin/movies/dto/create-movie.dto';
import { UpdateMovieDto } from 'src/admin/movies/dto/update-movie.dto';
import { MovieFilterDto } from 'src/shared/dtos/request/filters/movie-filter.dto';
import { PaginationDto } from 'src/shared/dtos/request/pagination.dto';
import { AuthorizedUser } from 'src/shared/interfaces/authorized-user.interface';
import { ApiResponse } from '../../shared/response/ApiResponse'
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

    async storeMovie(createMovieDto: CreateMovieDto) {
        const data = await this.movieRepository.storeMovie(createMovieDto);
        return new ApiResponse('API_SUCCESS', data, 'Movie has been created');
    }

    async updateMovie(
        id: number,
        updateMovieDto: UpdateMovieDto,
    ) {
        const movie = await this.movieRepository.updateMovie(id, updateMovieDto);

        return new ApiResponse('API_SUCCESS', movie, 'Movie has been updated');
    }
    async updateAvailability(id: number) {
        const movie = await this.movieRepository.findOne({ id });
        if (!movie) {
            return new ApiResponse('API_ERROR', null, `Movie with ID "${id}" not found`)
        }
        movie.availability = !movie.availability;
        movie.save();
        return new ApiResponse('API_SUCCESS', { availability: movie.availability }, `Movie availablity updated`);
    }

    async deleteMovie(id: number) {
        const result = await this.movieRepository.delete({ id });
        if (result.affected === 0) {
            return new ApiResponse('API_ERROR', null, `couldn remove movie ID ${id}`);
        }
        return new ApiResponse('API_SUCCESS', null, 'movie has been remove')
    }
}
