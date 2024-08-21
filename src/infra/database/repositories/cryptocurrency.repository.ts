import { Injectable, Module } from '@nestjs/common';
import { getDataSourceToken, getRepositoryToken, InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { ICreateCryptocurrency } from '../interface/create-crypto.interface';
import { Cryptocurrency } from '../models/cryptocurrency/cryptocurrency';

@Injectable()
export class CryptocurrencyRepository {
  constructor(@InjectRepository(Cryptocurrency) private cryptocurrencyModel: Repository<Cryptocurrency>) {}

  async create(payload: ICreateCryptocurrency): Promise<Cryptocurrency> {
    const crypto = this.cryptocurrencyModel.create(payload);
    return this.cryptocurrencyModel.save(crypto);
  }

  async findBySymbol(symbol: string): Promise<Cryptocurrency | null> {
    const crypto = this.cryptocurrencyModel.findOne({ where: { symbol: symbol } });
    return crypto;
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Cryptocurrency])],
  providers: [
    CryptocurrencyRepository,
    {
      provide: getRepositoryToken(Cryptocurrency),
      inject: [getDataSourceToken()],
      useFactory(datasource: DataSource) {
        return datasource.getRepository(Cryptocurrency);
      },
    },
  ],
  exports: [CryptocurrencyRepository],
})
export class CryptocurrencyRepositoryModule {}
