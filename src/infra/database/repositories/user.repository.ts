import { Injectable, Module } from '@nestjs/common';
import { getDataSourceToken, getRepositoryToken, InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { ICreateUser } from '../interface/create-user-interface';
import { User } from '../models/user/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}

  async create(payload: ICreateUser): Promise<User | null> {
    const user = this.userModel.create(payload);
    return this.userModel.save(user);
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { username } });
    return user;
  }

  findUserById(userId: number): Promise<User | null> {
    const user = this.userModel.findOne({ where: { id: userId } });
    return user;
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserRepository,
    {
      provide: getRepositoryToken(User),
      inject: [getDataSourceToken()],
      useFactory(datasource: DataSource) {
        return datasource.getRepository(User);
      },
    },
  ],
  exports: [UserRepository],
})
export class UserRepositoryModule {}
