import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class MovieFilterDto {
    @IsOptional()
    @IsString()
    title: string;


    @IsOptional()
    @IsString()
    fields: string;

    @IsOptional()
    @Transform(availability => {
        if (availability.toLowerCase() == 'true') {
            availability = true;
        } else if (availability.toLowerCase() == 'false') {
            availability = false;
        }
    })
    @IsBoolean()
    availability: boolean;
}
