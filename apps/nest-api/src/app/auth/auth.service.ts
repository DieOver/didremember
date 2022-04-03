
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTOReq, LoginDTORes } from '../../dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(login: LoginDTOReq): Promise<LoginDTORes> {
    try {
      const user = await this.userService.findByUsername(login.username);
      if (!user) throw 'user_not_found';
      if (user.password != login.password) throw 'wrong_password';
      const { password, ...result } = user;
      return {
        access_token: this.jwtService.sign(result),
      };
    } catch (error) {
      switch (error) {
        case 'user_not_found':
          throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
        case 'wrong_password':
          throw new HttpException('Senha inválida.', HttpStatus.BAD_REQUEST);
        default:
          throw new HttpException('Erro ao logar.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

}
