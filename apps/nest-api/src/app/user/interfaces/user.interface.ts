export interface IUser {
  id: number;
  name: string;
  age: number;
  username: string;
  password: string;
  roles: ERoles[];
}

export enum ERoles {
  ADMIN,
  CLIENT
}
