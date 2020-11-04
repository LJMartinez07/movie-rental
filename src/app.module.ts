import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesController } from './movies/movies.controller';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { ModulesmoviesService } from './modulesmovies/modulesmovies.service';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [UsersModule, MoviesModule, DatabaseModule],
  controllers: [AppController, MoviesController, UsersController],
  providers: [AppService, ModulesmoviesService],
})
export class AppModule {}
