import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '../../entities/auth.entity';
import { Movie } from '../../entities/movie.entity';
import { Role } from '../../entities/role.entity';
import { User } from '../../entities/user.entity';
import { LikeRepository } from '../../movies/repositories/like.repository';
import { MovieRepository } from '../../movies/repositories/movie.repository';
import { testDbConnection } from '../../utilities/connection-testing-helpers';
import { MovieLikes } from '../../entities/movieLikes.entity';
import { MoviesController } from './movies.controller';
import { MovieService } from '../../movies/services/movie.service';
import { MovieImages } from '../../entities/movieImages.entity';
import { MovieLogs } from '../../entities/movieLogs.entity';
import { Rental } from '../../entities/rental.entity';
import { Order } from '../../entities/order.entity';
import { AuthModule } from '../../auth/auth.module';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        TypeOrmModule.forRoot(
          testDbConnection([
            Movie,
            MovieLikes,
            MovieImages,
            MovieLogs,
            Rental,
            Order,
            User,
            Auth,
            Role,
          ]),
        ),
        TypeOrmModule.forFeature([
          MovieRepository,
          LikeRepository,
        ]),
      ],
      controllers: [MoviesController],
      providers: [
        MovieService,
      ]
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
