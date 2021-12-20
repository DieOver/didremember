import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async users(): Promise<IUser[]> {
    return await this.userService.users();
  }

  @Get(':id')
  async user(@Param('id') _id: number): Promise<IUser> {
    return await this.userService.user(_id);
  }

  @Post()
  async create(@Body() _body: CreateUserDTO): Promise<IUser> {
    return await this.userService.create(_body as IUser);
  }

}
