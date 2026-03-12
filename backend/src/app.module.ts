import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
})
export class AppModule {}
