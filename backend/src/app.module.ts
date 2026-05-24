import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'optimeal_user',
      password: process.env.DB_PASSWORD || 'optimeal_password',
      database: process.env.DB_NAME || 'optimeal_health_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // tablolari otomatik oluşturur
    }),
    AuthModule,
    HealthModule,
    AiModule,
  ],
})
export class AppModule {}
