import { Module } from '@nestjs/common';

import { UserCryptocurrencyRepositoryModule } from 'src/infra/database/repositories/user-cryptocurrency.repository';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [UserCryptocurrencyRepositoryModule],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
