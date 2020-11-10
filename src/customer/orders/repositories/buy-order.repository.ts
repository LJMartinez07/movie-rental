import {
    InternalServerErrorException,
} from '@nestjs/common';
import { Movie } from '../../../entities/movie.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../../../entities/order.entity';

@EntityRepository(Order)
export class BuyOrderRepository extends Repository<Order> {
    async buyMovie(
        movie: Movie,
        quantity: number,
        user_id: number,
    ) {
        try {
            const order = new Order();
            order.movie_id = movie.id;
            order.total = Number((movie.sale_price * quantity).toFixed(2));
            order.quantity = quantity;
            order.user_id = user_id;
            await order.save();
            return order;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
