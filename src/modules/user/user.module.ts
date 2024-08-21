import { Module } from '@nestjs/common';

import { UserRepositoryModule } from 'src/infra/database/repositories/user.repository';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [UserRepositoryModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
