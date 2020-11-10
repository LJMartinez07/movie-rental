import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    MoviesModule,
    AdminModule,
    CustomerModule,
  ],
})
export class AppModule { }
