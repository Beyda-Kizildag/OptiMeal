import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
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
  async register(name: string, email: string, pass: string): Promise<User> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(pass, salt);

      const user = this.userRepository.create({
        name,
        email,
        password_hash: hashedPassword,
      });

      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique constraint violation
        throw new ConflictException('Bu e-posta adresi zaten kullanılıyor.');
      }
      throw error;
    }
  }

  // Giriş kontrolü ve Token üretimi
  async login(email: string, pass: string): Promise<string> {
    console.log(`Login attempt for email: ${email}`);
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      console.log('User not found in DB');
      throw new UnauthorizedException('E-posta veya şifre hatalı!');
    }

    const isMatch = await bcrypt.compare(pass, user.password_hash);
    if (!isMatch) {
      console.log('Password does not match');
      throw new UnauthorizedException('E-posta veya şifre hatalı!');
    }

    const payload = { sub: user.id, email: user.email };
    return await this.jwtService.signAsync(payload);
  }
}