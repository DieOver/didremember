import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() _body: any) {
    return this.authService.login(_body.username, _body.password);
  }

}
