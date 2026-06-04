import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';

import type { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto} from './signUpDto';
import { SignInDto } from './signInDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    // 1. Önce token'ı alıyoruz (Service sadece string döner)
    const token = await this.authService.login(signInDto.email, signInDto.pass);

    response.cookie('access_token', token, {
      httpOnly: true,
      secure: false, // Localhost olduğu için false
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 gün
    });

    return { message: 'Giriş başarılı', access_token: token };
  }

  @Post('register')
  signUp(@Body() signUpDto: SignUpDto) {
    console.log('Gelen Veri:', signUpDto);
    return this.authService.register(signUpDto.name, signUpDto.email, signUpDto.pass);
  }
}