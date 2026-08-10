import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';

import type { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './signUpDto';
import { SignInDto } from './signInDto';
import { JwtAuthGuard } from './jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Put('password')
  async changePassword(@Req() req, @Body() body: { currentPass: string, newPass: string }) {
    await this.authService.changePassword(req.user.id, body.currentPass, body.newPass);
    return { message: 'Şifre başarıyla güncellendi' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('preferences')
  async getPreferences(@Req() req) {
    const user = await this.authService.getUser(req.user.id);
    return { preferences: user.preferences || {} };
  }

  @UseGuards(JwtAuthGuard)
  @Put('preferences')
  async updatePreferences(@Req() req, @Body() body: any) {
    const user = await this.authService.updatePreferences(req.user.id, body);
    return { message: 'Tercihler güncellendi', preferences: user.preferences };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('account')
  async deleteAccount(@Req() req) {
    await this.authService.deleteAccount(req.user.id);
    return { message: 'Hesap başarıyla silindi' };
  }
}