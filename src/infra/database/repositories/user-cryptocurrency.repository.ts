import { Injectable, Module } from '@nestjs/common';
import { getDataSourceToken, getRepositoryToken, InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { ICreateUserCryptocurrency } from '../interface/create-user-cryptocurrency.interface';
import { UserCryptocurrency } from '../models/user/user-cryptocurrency';

@Injectable()
export class UserCryptocurrencyRepository {
  constructor(@InjectRepository(UserCryptocurrency) private userCryptocurrencyModel: Repository<UserCryptocurrency>) {}

  async create(payload: ICreateUserCryptocurrency): Promise<UserCryptocurrency | null> {
    const crypto = this.userCryptocurrencyModel.create(payload);
    return this.userCryptocurrencyModel.save(crypto);
  }

  async findOne(symbol: string, userId: number): Promise<UserCryptocurrency | null> {
    const userCrypto = await this.userCryptocurrencyModel.findOne({
      where: {
        user: { id: userId },
        cryptocurrency: { symbol: symbol },
      },
    });
    return userCrypto;
  }

  async findAll(userId: number): Promise<UserCryptocurrency[]> {
    const userCryptos = await this.userCryptocurrencyModel.find({
      where: {
        user: { id: userId },
      },
      relations: ['cryptocurrency'],
    });
    return userCryptos;
  }

  async remove(userCrypto: UserCryptocurrency): Promise<void> {
    await this.userCryptocurrencyModel.remove(userCrypto);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([UserCryptocurrency])],
  providers: [
    UserCryptocurrencyRepository,
    {
      provide: getRepositoryToken(UserCryptocurrency),
      inject: [getDataSourceToken()],
      useFactory(datasource: DataSource) {
        return datasource.getRepository(UserCryptocurrency);
      },
    },
  ],
  exports: [UserCryptocurrencyRepository],
})
export class UserCryptocurrencyRepositoryModule {}
