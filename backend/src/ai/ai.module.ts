import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { HealthModule } from '../health/health.module';
import { ChatHistory } from './entities/chat-history.entity';
import { AiMemory } from './entities/ai-memory.entity';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [
    HealthModule,
    TypeOrmModule.forFeature([ChatHistory, AiMemory, User]),
  ],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
