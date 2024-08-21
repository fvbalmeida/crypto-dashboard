import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const dataSourceConnection = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: 3306,
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  synchronize: false,
  migrations: ['dist/infra/database/migrations/*.js'],
  migrationsRun: false,
  logging: true,
  migrationsTableName: 'typeorm_migrations',
});

export default dataSourceConnection;
