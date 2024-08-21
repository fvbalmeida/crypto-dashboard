/* eslint-disable security/detect-object-injection */
import { BadRequestException, Injectable } from '@nestjs/common';
import Table from 'cli-table3';
import WebSocket from 'ws';

import { UserCryptocurrencyRepository } from 'src/infra/database/repositories/user-cryptocurrency.repository';

import { ICryptoInfo } from './interface/crypto-info.interface';

@Injectable()
export class DashboardService {
  constructor(private readonly userCryptocurrencyRepository: UserCryptocurrencyRepository) {}
  private ccStreamer: WebSocket | null = null;

  async launchCryptoDashboard(userId: number): Promise<void> {
    const userCryptos = await this.userCryptocurrencyRepository.findAll(userId);

    if (!userCryptos || userCryptos.length === 0) {
      throw new BadRequestException('User has no cryptocurrencies');
    }

    this.ccStreamer = new WebSocket(`${process.env.WEBSOCKET_BASE_URL}?api_key=${process.env.CRYPTOCOMPARE_API_KEY}`);

    // create table to show on console
    const table = new Table({
      head: ['Symbol', 'Price (USD)', '24h Variation'],
      colWidths: [10, 15, 20],
    });

    // object for temporary crypto info
    const cryptoInfo: Record<string, ICryptoInfo> = {};

    // create new array with user's cryptocurrencies websocket subscriptions
    this.ccStreamer.on('open', () => {
      const subscriptions = userCryptos.flatMap(({ cryptocurrency }) => [
        `24~CCCAGG~${cryptocurrency.symbol}~USD~D`,
        `2~Coinbase~${cryptocurrency.symbol}~USD`,
      ]);
      this.ccStreamer?.send(JSON.stringify({ action: 'SubAdd', subs: subscriptions }));
    });

    this.ccStreamer.on('message', (data: any) => {
      const parsedData = JSON.parse(data);
      console.log(parsedData);

      // verify type of websocket message and update cryptoInfo object to display correctly on dashboard
      if (parsedData.TYPE === '24') {
        const { FROMSYMBOL, OPEN, CLOSE } = parsedData;
        const previousVariation = cryptoInfo[FROMSYMBOL]?.variation || 0;
        const lastDayVariation = ((CLOSE - OPEN) / OPEN) * 100;
        let lastDayVariationColor = '\x1b[31m'; // red color for price decrease

        if (lastDayVariation > previousVariation) {
          lastDayVariationColor = '\x1b[32m'; // green for price increase
        }

        const lastDayVariationText = `${lastDayVariationColor}${lastDayVariation.toFixed(2)}%\x1b[0m`;
        cryptoInfo[FROMSYMBOL] = { ...cryptoInfo[FROMSYMBOL], lastDayVariation, lastDayVariationText };
      }

      if (parsedData.TYPE === '2') {
        const { FROMSYMBOL, PRICE } = parsedData;
        const price = PRICE !== undefined ? PRICE : cryptoInfo[FROMSYMBOL]?.price;

        if (price !== undefined) {
          cryptoInfo[FROMSYMBOL] = { ...cryptoInfo[FROMSYMBOL], price: price };
        }

        table.splice(0, table.length);
        for (const symbol in cryptoInfo) {
          const { price, lastDayVariationText } = cryptoInfo[symbol];
          table.push([symbol, price?.toFixed(2) || 'N/A', lastDayVariationText || 'Waiting for data']);
        }

        console.clear();
        console.log(table.toString());
      }
    });

    this.ccStreamer.on('close', () => {
      console.log('WebSocket connection closed');
    });
  }
}
