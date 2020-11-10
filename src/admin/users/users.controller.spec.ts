import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../../users/repositories/user.respository';
import { AuthModule } from '../../auth/auth.module';
import { UserService } from '../../users/services/user.service';
import { UsersController } from './users.controller';
import { Movie } from '../../entities/movie.entity'
import { MovieLikes } from '../../entities/movieLikes.entity';
import { MovieImages } from '../../entities/movieImages.entity';
import { MovieLogs } from '../../entities/movieLogs.entity';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';
import { Auth } from '../../entities/auth.entity';
import { Rental } from '../../entities/rental.entity';
import { Order } from '../../entities/order.entity';
import { testDbConnection } from '../../utilities/connection-testing-helpers';
describe('UsersController', () => {
  let controller: UsersController;

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
          UserRepository,
        ]),
      ],
      controllers: [UsersController],
      providers: [UserService]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
