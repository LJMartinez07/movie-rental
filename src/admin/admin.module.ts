import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LikeRepository } from 'src/movies/repositories/like.repository';
import { MovieRepository } from 'src/movies/repositories/movie.repository';
import { MovieService } from 'src/movies/services/movie.service';
import { UserRepository } from 'src/users/repositories/user.respository';
import { MoviesController } from './movies/movies.controller';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            UserRepository,
            MovieRepository,
            LikeRepository,
        ]),
    ],
    controllers: [MoviesController],
    providers: [MovieService]
})
export class AdminModule { }
