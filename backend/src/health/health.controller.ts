import { Controller, Get,Post, Body, Req, UseGuards} from '@nestjs/common';
import { HealthService } from './health.service';
import { CreateHealthProfileDto } from './dto/create-health-profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Post('profile') // Alt yol: profile -> Tam yol: /health/profile
  @UseGuards(JwtAuthGuard)
  createProfile(@Req() req, @Body() dto: CreateHealthProfileDto) {
    // req.user.id'nin UUID (string) olduğundan emin olmalısın
    return this.healthService.saveOrUpdateProfile(req.user.id, dto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return this.healthService.getProfile(req.user.id);
  }

  @Get('diseases')
  getAllDiseases() {
    return this.healthService.getDiseaseList();
  }
}