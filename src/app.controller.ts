import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AdminGuard } from './guards/admin.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Get()
  async getHello(): Promise<any> {
    return await this.appService.getHello();
  }
}
