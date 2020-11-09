import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MoviesController } from './movies.controller';
import { MovieRepository } from './repositories/movie.repository';
import { MovieService } from './services/movie.service';
@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      MovieRepository,
    ]),
  ],
  controllers: [MoviesController],
  providers: [MovieService]
})
export class MoviesModule { }
