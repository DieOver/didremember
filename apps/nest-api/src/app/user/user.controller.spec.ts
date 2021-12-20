import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let user: TestingModule;

  beforeAll(async () => {
    user = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to nest-api!"', () => {
      const userController = user.get<UserController>(UserController);
      expect(userController.getData()).toEqual({
        message: 'Welcome to nest-api!',
      });
    });
  });
});
