import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body(ValidationPipe) data: CreateUserDto): Promise<string> {
    const { username, password } = data;
    return this.userService.createAccount(username, password);
  }
}
