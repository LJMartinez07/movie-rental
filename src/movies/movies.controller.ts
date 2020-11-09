import {
    Controller,
    Get,
    UseGuards,
    Query,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import { PaginationDto } from 'src/shared/dtos/request/pagination.dto';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { AuthorizedUser } from 'src/shared/interfaces/authorized-user.interface';
import { AuthGuard } from '@nestjs/passport';
import { CheckTokenGuard } from 'src/shared/guards/check-token.guard';
import { routes } from 'src/constants';

@Controller(routes.movies)
@UseGuards(CheckTokenGuard)
export class MoviesController { }
