import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { User } from '../../infra/database/models/user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string) {
    let user: User;
    try {
      user = await this.userService.findUser(username);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
