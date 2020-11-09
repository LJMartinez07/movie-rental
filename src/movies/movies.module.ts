import { Module } from '@nestjs/common';
import { MovieService } from './movie/movie.service';

@Module({
  providers: [MovieService]
})
export class MoviesModule {}
