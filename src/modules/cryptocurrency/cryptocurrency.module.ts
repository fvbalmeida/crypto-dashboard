import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CryptocurrencyRepositoryModule } from 'src/infra/database/repositories/cryptocurrency.repository';
import { UserCryptocurrencyRepositoryModule } from 'src/infra/database/repositories/user-cryptocurrency.repository';
import { UserRepositoryModule } from 'src/infra/database/repositories/user.repository';

import { CryptocurrencyController } from './cryptocurrency.controller';
import { CryptocurrencyService } from './cryptocurrency.service';

@Module({
  imports: [UserRepositoryModule, CryptocurrencyRepositoryModule, UserCryptocurrencyRepositoryModule, HttpModule],
  controllers: [CryptocurrencyController],
  providers: [CryptocurrencyService],
  exports: [CryptocurrencyService],
})
export class CryptocurrencyModule {}
