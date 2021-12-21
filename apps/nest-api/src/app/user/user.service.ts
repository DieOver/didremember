import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {

  private USERS: IUser[] = [
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

  async create(_body: IUser): Promise<IUser> {
    try {
      this.USERS.push(_body);
      return _body;
    } catch (error) {
      throw new HttpException('Erro ao adicionar usuário.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async list(): Promise<IUser[]> {
    try {
      const users: IUser[] = this.USERS;
      return users;
    } catch (error) {
      throw new HttpException('Erro ao buscar usuários.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async find(_id: number): Promise<IUser> {
    try {
      const user: IUser = this.USERS.find((user) => user.id == _id);
      if (!user) throw 'user_not_found';
      return user;
    } catch (error) {
      switch (error) {
        case 'user_not_found':
          throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
        default:
          throw new HttpException('Erro ao buscar usuário.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async update(_id: number, _body: IUser): Promise<IUser> {
    try {
      const user = await this.find(_id);
      if (!user) throw 'user_not_found';
      user.age = _body.age;
      user.name = _body.name;
      return user;
    } catch (error) {
      switch (error) {
        case 'user_not_found':
          throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
        default:
          throw new HttpException('Erro ao atualizar usuário.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async delete(_id: number): Promise<string> {
    try {
      const user: IUser = this.USERS.find((user) => user.id == _id);
      if (!user) throw 'user_not_found';
      const users = this.USERS.filter((user) => user.id != _id);
      this.USERS = users;
      return 'Usuário removido.';
    } catch (error) {
      switch (error) {
        case 'user_not_found':
          throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
        default:
          throw new HttpException('Erro ao deletar usuário.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

}
