import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginDTOReq, LoginDTORes } from '../dto';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('auth/login')
  async login(@Body() _body: LoginDTOReq): Promise<LoginDTORes> {
    return this.authService.login(_body);
  }

}
