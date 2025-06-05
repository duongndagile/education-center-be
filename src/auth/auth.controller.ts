/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    console.log('AuthController initialized');
  }

  @Post('login')
  @Public()
  async login(@Body() dto: LoginDto) {
    console.log('Login DTO:', dto);
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body() body) {
    return this.authService.register(body);
  }
}
