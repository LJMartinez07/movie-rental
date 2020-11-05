import { Controller } from '@nestjs/common';
import { routes } from '../../constants';
@Controller(routes.movies)
export class MoviesController { }
