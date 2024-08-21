import { Body, Controller, Delete, Get, Param, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserCryptocurrency } from 'src/infra/database/models/user/user-cryptocurrency';

import { CustomRequest } from '../auth/dto/login.dto';

import { CryptocurrencyService } from './cryptocurrency.service';
import { createUserCryptocurrencyDto } from './dto/create-user-crypto.dto';

@Controller('crypto')
export class CryptocurrencyController {
  constructor(private readonly cryptocurrencyService: CryptocurrencyService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUserCryptocurrencies(@Req() req: CustomRequest): Promise<UserCryptocurrency[] | null> {
    console.log(req);
    const cryptocurrencies = await this.cryptocurrencyService.findUserCryptocurrencies(req.user.id);
    return cryptocurrencies;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createUserCryptocurrency(
    @Request() req: CustomRequest,
    @Body() data: createUserCryptocurrencyDto,
  ): Promise<string> {
    const user = req.user;
    const cryptocurrency = await this.cryptocurrencyService.saveUserCryptocurrency(user.id, data.symbol);
    return cryptocurrency;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteCryptocurrency(@Request() req: CustomRequest, @Param('symbol') symbol: string): Promise<string> {
    const user = req.user;
    const cryptocurrency = await this.cryptocurrencyService.removeUserCryptocurrency(user.id, symbol);
    return cryptocurrency;
  }
}
