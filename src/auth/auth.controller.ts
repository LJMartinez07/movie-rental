import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './services/auth.service'
import { Auth } from '../entities/auth.entity'
import { UserRegistrationDto } from '../shared/dtos/request/user-registration.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('/register')
    register(
        @Body(ValidationPipe) userRegistrationDto: UserRegistrationDto,
    ): Promise<void> {
        return this.authService.register(userRegistrationDto);
    }

    @Post('/login')
    signIn(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<Auth> {
        return this.authService.login(authCredentialsDto);
    }

    @Delete('/logout')
    @UseGuards(AuthGuard())
    logout(): Promise<void> {
        return this.authService.logout();
    }

}