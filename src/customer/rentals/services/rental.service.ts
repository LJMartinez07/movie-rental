import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/shared/response/ApiResponse';
import { MovieService } from '../../../movies/services/movie.service';
import { AuthorizedUser } from '../../../shared/interfaces/authorized-user.interface';
import { RentalDto } from '../dto/rental.dto';
import { RentalRepository } from '../repositories/rental.repository';
import { RentalReturnRepository } from '../repositories/rental-return.repository'
import { Rental } from 'src/entities/rental.entity';
@Injectable()
export class RentalService {
    constructor(
        @InjectRepository(RentalRepository)
        private rentalRepository: RentalRepository,
        @InjectRepository(RentalReturnRepository)
        private rentalReturnRepository: RentalReturnRepository,
        private moviesService: MovieService
    ) { }

    async rentMovie(
        rentDto: RentalDto,
        user: AuthorizedUser,
    ) {
        const { movie_id, returned_at } = rentDto;
        const movie = await this.moviesService.findMovie(movie_id);

        if (!movie.availability) {
            return new ApiResponse('API_ERROR', null, `Movie with ID "${movie_id} is no avaliable"`)
        }

        if (movie.stock === 0) {
            return new ApiResponse('API_ERROR', null, `Movie with ID "${movie_id}" stock 0`)
        }

        const rental = await this.rentalRepository.rentMovie(
            movie,
            user.user_id,
            returned_at,
        );
        await movie.reload();
        return new ApiResponse('API_SUCCESS', rental)
    }

    async returnMovie(
        rental_id: number,
        user: AuthorizedUser,
    ) {
        const rental = await this.findRental(rental_id, user.user_id);
        const return_order = await this.rentalReturnRepository.returnMovie(rental);

        await rental.movie.reload();

        return new ApiResponse('API_SUCCESS', return_order);
    }

    private async findRental(rental_id: number, user_id: number): Promise<Rental> {
        const rental = await Rental.createQueryBuilder('rental_o')
            .where('rental_o.id = :id', { id: rental_id })
            .andWhere('rental_o.user_id = :user_id', { user_id })
            .leftJoinAndSelect('rental_o.movie', 'p', 'p.id = rental_o.movie_id ')
            .getOne();
        if (!rental) {
            throw new NotFoundException(`Rental Order with ID "${rental_id}" not found`);
        }

        return rental;
    }
}
