import {
    EntityRepository,
    Repository,
} from 'typeorm';
import { Movie } from 'src/entities/movie.entity';
import { PaginationDto } from 'src/shared/dtos/request/pagination.dto';
import { MovieFilterDto } from 'src/shared/dtos/request/filters/movie-filter.dto';
import { AuthorizedUser } from 'src/shared/interfaces/authorized-user.interface';
import { InternalServerErrorException } from '@nestjs/common';

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

}