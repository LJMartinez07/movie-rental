import { Transform } from 'class-transformer';
import { IsInt, IsPositive, IsNotEmpty } from 'class-validator';

export class RentalDto {
    @IsPositive()
    @IsInt()
    @Transform(movie_id => parseInt(movie_id))
    movie_id: number;


    @IsNotEmpty()
    returned_at: Date;
}
