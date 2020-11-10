import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../users/repositories/user.respository';
import { AuthModule } from '../auth/auth.module';
import { OrdersController } from './orders/orders.controller';
import { OrderService } from './orders/services/order.service';
import { RentalsController } from './rentals/rentals.controller';
import { MovieRepository } from '../movies/repositories/movie.repository';
import { LikeRepository } from '../movies/repositories/like.repository';
import { MovieService } from '../movies/services/movie.service';
import { BuyOrderRepository } from './orders/repositories/buy-order.repository';
import { RentalService } from './rentals/services/rental.service';
import { RentalRepository } from './rentals/repositories/rental.repository';
import { RentalReturnRepository } from './rentals/repositories/rental-return.repository';


@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      MovieRepository,
      LikeRepository,
      RentalRepository,
      RentalReturnRepository,
      BuyOrderRepository
    ]),
  ],
  controllers: [OrdersController, RentalsController],
  providers: [OrderService, MovieService, RentalService]
})
export class CustomerModule { }
