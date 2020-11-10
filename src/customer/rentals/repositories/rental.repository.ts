import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Movie } from "../../../entities/movie.entity";
import { Rental } from "../../../entities/rental.entity";


@EntityRepository(Rental)
export class RentalRepository extends Repository<Rental> {

    async rentMovie(
        movie: Movie,
        user_id: number,
        returned_at: Date,
    ) {
        try {
            const rental = this.create();
            rental.movie_id = movie.id;
            rental.user_id = user_id;
            rental.returned_at = new Date(returned_at);
            rental.rented_at = new Date();
            const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 3600 * 24));
            console.log(diffDays(rental.rented_at, rental.returned_at));
            rental.total = diffDays(rental.rented_at, rental.returned_at) * movie.rental_price;
            await rental.save();
            return rental;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }



}