import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { Cryptocurrency } from './models/cryptocurrency/cryptocurrency';
import { UserCryptocurrency } from './models/user/user-cryptocurrency';
import { User } from './models/user/user.entity';

dotenv.config();

export const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql' as const,
  host: process.env.MYSQL_HOST,
  port: 3306,
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  synchronize: false,
  migrationsRun: false,
  logging: true,
  entities: [User, Cryptocurrency, UserCryptocurrency],
};
