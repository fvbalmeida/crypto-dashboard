import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CustomRequest } from '../auth/dto/login.dto';

import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async launchDashboard(@Req() req: CustomRequest) {
    await this.dashboardService.launchCryptoDashboard(req.user.id);
  }
}
