import { EntityRepository, Repository } from 'typeorm';
import { MovieLikes } from 'src/entities/movieLikes.entity';

@EntityRepository(MovieLikes)
export class LikeRepository extends Repository<MovieLikes> {

}
