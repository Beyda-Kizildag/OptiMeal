import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AiService } from './ai.service';
import { ChatRequestDto } from './dto/chat-request.dto';
import { AddDocumentDto } from './dto/add-document.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(JwtAuthGuard)
  @Post('chat')
  async chat(@Request() req, @Body() chatRequest: ChatRequestDto) {
    return {
      reply: await this.aiService.chat(req.user.id, chatRequest.message),
    };
  }

  @Post('documents')
  async addDocument(@Body() addDocumentDto: AddDocumentDto) {
    await this.aiService.addDocument(addDocumentDto.content, addDocumentDto.metadata);
    return { message: 'Document added successfully' };
  }
}
