import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './signUpDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.login(signInDto.email, signInDto.password);
  }

  @Post('register')
  signUp(@Body() signUpDto: SignUpDto) {
    console.log('Gelen Veri:', signUpDto);
    return this.authService.register(signUpDto.email, signUpDto.password);
  }
}