import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthProfile } from './entities/health-profile.entity';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HealthProfile])], // Entity'i TypeORM'e tanıtıyoruz
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService], // Gerekirse başka modüllerde kullanmak için
})
export class HealthModule {}