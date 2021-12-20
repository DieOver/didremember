import { Test, TestingModule } from '@nestjs/testing';

import { CommonController } from './common.controller';
import { CommonService } from './common.service';

describe('CommonController', () => {
  let common: TestingModule;

  beforeAll(async () => {
    common = await Test.createTestingModule({
      controllers: [CommonController],
      providers: [CommonService],
    }).compile();
  });

});
