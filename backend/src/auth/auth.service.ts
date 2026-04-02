import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Şifreyi gizleyerek kullanıcı oluşturma
  async register(email: string, pass: string): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pass, salt);

    const user = this.userRepository.create({
      email,
      password_hash: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  // Giriş kontrolü ve Token üretimi
  async login(email: string, pass: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(pass, user.password_hash))) {
      const payload = { sub: user.id, email: user.email };

      return await this.jwtService.signAsync(payload);
    }
    throw new UnauthorizedException('E-posta veya şifre hatalı!');
  }
}