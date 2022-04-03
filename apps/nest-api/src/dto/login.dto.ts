import { IsString } from 'class-validator';

export class LoginDTOReq {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class LoginDTORes {
  @IsString()
  access_token: string;
}
