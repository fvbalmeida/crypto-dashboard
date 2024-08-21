import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from './infra/database/database.module';
import { dbConfig } from './infra/database/db.config';
import { AuthModule } from './modules/auth/auth.module';
import { CryptocurrencyModule } from './modules/cryptocurrency/cryptocurrency.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dbConfig),
    DatabaseModule,
    UserModule,
    AuthModule,
    CryptocurrencyModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
