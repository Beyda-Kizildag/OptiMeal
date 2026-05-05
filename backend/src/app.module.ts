import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'optimeal_user',
      password: 'optimeal_password',
      database: 'optimeal_health_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // tablolari otomatik oluşturur
    }),
    AuthModule,
    HealthModule,
  ],
})
export class AppModule {}
