import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LikeRepository } from 'src/movies/repositories/like.repository';
import { MovieRepository } from 'src/movies/repositories/movie.repository';
import { MovieService } from 'src/movies/services/movie.service';
import { UserRepository } from 'src/users/repositories/user.respository';
import { MoviesController } from './movies/movies.controller';
import { UsersController } from './users/users.controller'
import { UserService } from '../users/services/user.service'
@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            UserRepository,
            MovieRepository,
            LikeRepository,
        ]),
    ],
    controllers: [MoviesController, UsersController],
    providers: [MovieService, UserService]
})
export class AdminModule { }
