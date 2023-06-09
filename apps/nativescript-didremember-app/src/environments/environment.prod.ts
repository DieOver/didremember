import { IEnvironment } from './environment.contract';

export const environment: IEnvironment = {
  production: true,
  jsonplaceholder: 'https://jsonplaceholder.typicode.com',
  name_postit_shared: 'postit',
  auth: {
    token: 'AUTH_USER'
  }
};
