import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    stock: number;

    @ApiProperty()
    @IsNotEmpty()
    sale_price: number;

    @ApiProperty()
    @IsNotEmpty()
    rental_price: number;
}
