import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { HealthModule } from '../health/health.module';

@Module({
  imports: [HealthModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
