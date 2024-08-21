import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from 'src/infra/database/models/user/user.entity';
import { UserRepository } from 'src/infra/database/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createAccount(username: string, password: string): Promise<string> {
    const hasUser = await this.userRepository.findUserByUsername(username);
    if (hasUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await this.userRepository.create({
        username,
        password: hashedPassword,
      });
    } catch (error) {
      throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return 'Account created successfully';
  }

  async findUser(username: string): Promise<User> {
    const user = await this.userRepository.findUserByUsername(username);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
