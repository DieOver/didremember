import { IsString, IsInt } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  name: string;

  @IsInt()
  age: number;
}
