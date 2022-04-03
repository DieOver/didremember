import { Test } from '@nestjs/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const user = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = user.get<UserService>(UserService);
  });
});
