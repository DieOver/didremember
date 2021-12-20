import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {

  private readonly USERS: IUser[] = [
    {
      id: 1,
      name: 'Lennon',
      age: 31,
    },
    {
      id: 2,
      name: 'Mayara',
      age: 29,
    },
  ];

  async users(): Promise<IUser[]> {
    const users: IUser[] = this.USERS;
    return users;
  }

  async user(_id: number): Promise<IUser> {
    const user: IUser = this.USERS.find((user) => user.id == _id);
    if (user) {
      return user;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  async create(_body: IUser): Promise<IUser> {
    try {
      this.USERS.push(_body);
      return _body;
    } catch (error) {
      throw new HttpException('Erro ao adicionar Usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
