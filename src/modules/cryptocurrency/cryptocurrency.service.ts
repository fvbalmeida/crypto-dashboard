/* eslint-disable security/detect-object-injection */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

import { UserCryptocurrency } from 'src/infra/database/models/user/user-cryptocurrency';
import { CryptocurrencyRepository } from 'src/infra/database/repositories/cryptocurrency.repository';
import { UserCryptocurrencyRepository } from 'src/infra/database/repositories/user-cryptocurrency.repository';
import { UserRepository } from 'src/infra/database/repositories/user.repository';

@Injectable()
export class CryptocurrencyService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptocurrencyRepository: CryptocurrencyRepository,
    private readonly userCryptocurrencyRepository: UserCryptocurrencyRepository,
    private readonly httpService: HttpService,
  ) {}

  async saveUserCryptocurrency(userId: number, symbol: string): Promise<string> {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // verify if crypto exists on CryptoCompare
    const checkCryptocurrencySymbol = await this.checkCryptoBySymbol(symbol);

    if (!checkCryptocurrencySymbol) throw new Error('Cryptocurrency not found');

    let cryptocurrency = await this.cryptocurrencyRepository.findBySymbol(symbol);

    if (cryptocurrency) {
      throw new Error('Cryptocurrency already exists');
    }

    if (!cryptocurrency) {
      cryptocurrency = await this.cryptocurrencyRepository.create({
        symbol: symbol,
      });
    }

    const existingRelation = await this.userCryptocurrencyRepository.findOne(symbol, userId);

    if (!existingRelation) {
      await this.userCryptocurrencyRepository.create({
        user,
        cryptocurrency,
      });
    }

    return `Crypto ${symbol} saved`;
  }

  async checkCryptoBySymbol(symbol: string) {
    const url = `${process.env.API_BASE_URL}/asset/v1/data/by/symbol?asset_symbol=${symbol}`;

    try {
      await lastValueFrom(
        this.httpService.get(url).pipe(
          map((response) => {
            return response.data;
          }),
        ),
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async findUserCryptocurrencies(userId: number): Promise<UserCryptocurrency[] | null> {
    return this.userCryptocurrencyRepository.findAll(userId);
  }

  async removeUserCryptocurrency(userId: number, symbol: string): Promise<string> {
    try {
      const user = await this.userRepository.findUserById(userId);

      if (!user) {
        throw new Error('User not found');
      }

      const userCryptocurrency = await this.userCryptocurrencyRepository.findOne(symbol, userId);

      if (!userCryptocurrency) {
        throw new Error('User cryptocurrency record not found');
      }

      await this.userCryptocurrencyRepository.remove(userCryptocurrency);
    } catch (error) {
      console.error('Error removing user cryptocurrency:', error);
      throw error;
    }

    return 'User cryptocurrency removed successfully';
  }
}
