import {
    EntityRepository,
    Repository,
} from 'typeorm';
import { Movie } from '../../entities/movie.entity';
import { PaginationDto } from 'src/shared/dtos/request/pagination.dto';
import { MovieFilterDto } from 'src/shared/dtos/request/filters/movie-filter.dto';
import { AuthorizedUser } from 'src/shared/interfaces/authorized-user.interface';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateMovieDto } from 'src/admin/movies/dto/create-movie.dto';
import { MovieLogs } from 'src/entities/movieLogs.entity';
import { UpdateMovieDto } from 'src/admin/movies/dto/update-movie.dto';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
    async getMovies(
        paginationDto: PaginationDto,
        MovieFilterDto: MovieFilterDto,
        user?: AuthorizedUser,
    ) {
        try {


            const page = paginationDto.page || 1;
            const limit = paginationDto.limit || 10;
            const sort = paginationDto.sort || 'title';
            const skip = (page - 1) * limit;
            const query = this.createQueryBuilder('movie');

            if (MovieFilterDto) {
                if (MovieFilterDto.hasOwnProperty('title')) {
                    query.where('movie.title LIKE :title', {
                        title: `%${MovieFilterDto.title}%`,
                    });
                }
                if (MovieFilterDto.hasOwnProperty('fields')) {
                    let fields = MovieFilterDto.fields.split(',');
                    let fieldsFormat = fields.map(field => {
                        if (field != 'likes') {
                            return `movie.${field}`
                        }
                    })
                    query.select(fieldsFormat)
                } else {
                    query
                        .leftJoinAndSelect('movie.likes', 'like');
                }
            }

            let sorts = sort.split(',');
            sorts.forEach(sort => {
                let sortfilter = sort[0] === '-' ? sort.split('-')[1] : sort
                sortfilter = `movie.${sortfilter}`;
                if (sort[0] == '-') {
                    query.orderBy(sortfilter, 'DESC');
                } else {
                    query.orderBy(sortfilter, 'ASC');
                }
            })
            query.take(limit).skip(skip);
            const [movies, total] = await query.getManyAndCount();
            return { movies, total };
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException();
        }
    }

    async storeMovie(createMovieDto: CreateMovieDto) {
        try {
            const {
                title,
                description,
                stock,
                sale_price,
                rental_price,
            } = createMovieDto;

            const movie = new Movie();
            movie.title = title;
            movie.description = description;
            movie.stock = stock;
            movie.sale_price = sale_price;
            movie.rental_price = rental_price;
            await movie.save();
            return movie;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
    async updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
        const movieFind = await this.findOne({ id });
        if (movieFind.stock !== updateMovieDto.stock) {
            const movie_id = movieFind.id;
            delete movieFind.id;
            this.createQueryBuilder()
                .insert()
                .into(MovieLogs)
                .values({ ...movieFind, movie_id })
                .execute();
        }
        const data = await this.update(id, updateMovieDto);
        return await this.findOne({ id });
    }
}