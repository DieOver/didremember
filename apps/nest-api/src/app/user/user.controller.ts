import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { IUser } from './interfaces/user.interface';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async list(): Promise<IUser[]> {
    return await this.userService.list();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async find(@Param('id') _id: number): Promise<IUser> {
    return await this.userService.find(_id);
  }

  @Post()
  async create(@Body() _body: CreateUserDTO): Promise<IUser> {
    return await this.userService.create(_body as IUser);
  }

  @Put(':id')
  async update(@Param('id') _id: number, @Body() _body: UpdateUserDTO): Promise<IUser> {
    return await this.userService.update(_id, _body as IUser);
  }

  @Delete(':id')
  async delete(@Param('id') _id: number): Promise<string> {
    return await this.userService.delete(_id);
  }

}
