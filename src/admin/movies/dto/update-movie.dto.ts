import { IsOptional } from 'class-validator';

export class UpdateMovieDto {
    @IsOptional()
    title: string;

    @IsOptional()
    description: string;

    @IsOptional()
    stock: number;

    @IsOptional()
    sale_price: number;

    @IsOptional()
    rental_price: number;
}
