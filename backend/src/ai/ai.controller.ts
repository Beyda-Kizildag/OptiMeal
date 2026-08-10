import { Controller, Post, Get, Delete, Param, Body, UseGuards, Request, Query } from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Get('chat/history')
  async getChatHistory(@Request() req) {
    return await this.aiService.getChatHistory(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('chat/history')
  async clearChatHistory(@Request() req) {
    await this.aiService.clearChatHistory(req.user.id);
    return { message: 'Sohbet geçmişi temizlendi' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('memories')
  async getMemories(@Request() req) {
    return await this.aiService.getMemories(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('memories/:id')
  async deleteMemory(@Param('id') id: string) {
    await this.aiService.deleteMemory(id);
    return { message: 'Hafıza silindi' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('recipe')
  async getRecipe(@Request() req, @Query('lang') lang?: string) {
    return await this.aiService.generateRecipe(req.user.id, lang || 'tr');
  }

  @Post('documents')
  async addDocument(@Body() addDocumentDto: AddDocumentDto) {
    await this.aiService.addDocument(addDocumentDto.content, addDocumentDto.metadata);
    return { message: 'Document added successfully' };
  }
}
