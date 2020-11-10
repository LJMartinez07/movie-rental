import { InternalServerErrorException } from "@nestjs/common";
import { Rental } from "src/entities/rental.entity";
import { Return } from "src/entities/return.entity";
import { EntityRepository, Repository } from "typeorm";
@EntityRepository(Return)
export class RentalReturnRepository extends Repository<Return> {

    async returnMovie(rental: Rental) {
        try {
            const rentalReturn = this.create();
            const today = new Date();
            const diffTime = today.getTime() - rental.returned_at.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
            const penalty =
                diffDays < 0 ? 0 : Number((rental.movie.daily_penalty * diffDays).toFixed(2));
            rentalReturn.rental_id = rental.id;
            rentalReturn.penalty = penalty;
            await rentalReturn.save();
            return rentalReturn;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException();
        }


    }
}
