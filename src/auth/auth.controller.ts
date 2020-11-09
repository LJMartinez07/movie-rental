import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    Delete,
    UseGuards,
    HttpCode
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './services/auth.service'
import { UserRegistrationDto } from '../shared/dtos/request/user-registration.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { ApiResponse } from 'src/shared/response/ApiResponse';
import { CheckTokenGuard } from 'src/shared/guards/check-token.guard';
import { routes } from 'src/constants/routes';
@Controller(routes.auth)
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('/register')
    register(
        @Body(ValidationPipe) userRegistrationDto: UserRegistrationDto,
    ): Promise<ApiResponse> {
        return this.authService.register(userRegistrationDto);
    }

    @Post('/login')
    @HttpCode(200)
    signIn(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<ApiResponse> {
        return this.authService.login(authCredentialsDto);
    }

    @Delete('/logout')
    @UseGuards(AuthGuard(), CheckTokenGuard)
    logout(): Promise<ApiResponse> {
        return this.authService.logout();
    }

    @Post('/refresh')
    @HttpCode(200)
    refreshToken(@Body('refresh_token') refresh_token: string): Promise<ApiResponse> {
        return this.authService.refreshToken(refresh_token);
    }

}