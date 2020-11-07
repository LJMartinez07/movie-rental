import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats/cats.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserController } from './user/user.controller';
import { UsersController } from './users/users.controller';
@Module({
  imports: [
    // ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController, CatsController, AuthController, UserController, UsersController],
  providers: [AppService, AuthService],
})
export class AppModule { }
