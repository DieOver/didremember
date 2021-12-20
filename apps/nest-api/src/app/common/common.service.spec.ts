import { Test } from '@nestjs/testing';

import { CommonService } from './common.service';

describe('CommonService', () => {
  let service: CommonService;

  beforeAll(async () => {
    const common = await Test.createTestingModule({
      providers: [CommonService],
    }).compile();

    service = common.get<CommonService>(CommonService);
  });

});
