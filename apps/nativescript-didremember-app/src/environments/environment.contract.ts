export interface IEnvironment {
  production: boolean;
  jsonplaceholder: string;
  name_postit_shared: string;
  auth: IAuth;
}

interface IAuth {
  token: string;
}
