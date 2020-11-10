import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieService } from 'src/movies/services/movie.service';
import { AuthorizedUser } from 'src/shared/interfaces/authorized-user.interface';
import { ApiResponse } from 'src/shared/response/ApiResponse';
import { BuyOrderRepository } from '../repositories/buy-order.repository';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(BuyOrderRepository)
        private buyOrderRepository: BuyOrderRepository,
        private movieService: MovieService,
    ) { }

    async buyMovie(
        buyMovieDto,
        user: AuthorizedUser,
    ) {
        const { movie_id, quantity } = buyMovieDto;

        const movie = await this.movieService.findMovie(movie_id);

        if (!movie.availability) {
            return new ApiResponse('API_ERROR', null, `Movie with ID "${movie_id} unvailable"`)
        }

        if (quantity > movie.stock) {
            return new ApiResponse('API_ERROR', null, `No stock for movie with ID "${movie_id}"`)
        }

        const order = await this.buyOrderRepository.buyMovie(
            movie,
            quantity,
            user.user_id,
        );
        await movie.reload();
        order
        return new ApiResponse('API_SUCCESS', order)
    }
}
