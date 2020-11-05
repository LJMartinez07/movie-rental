import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesController } from './modules/movies/movies.controller';
import { UsersController } from './modules/users/users.controller';
import { UsersModule } from './modules/users/users.module';
import { MoviesModule } from './modules/movies/movies.module';
import { DatabaseModule } from './modules/database/database.module';
import { AuthController } from './modules/auth/auth.controller';

@Module({
  imports: [UsersModule, MoviesModule, DatabaseModule],
  controllers: [AppController, MoviesController, UsersController, AuthController],
  providers: [AppService],
})
export class AppModule { }
