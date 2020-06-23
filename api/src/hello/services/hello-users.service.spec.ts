/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import { Test, TestingModule } from '@nestjs/testing';

import { HelloUsersService } from './hello-users.service';

describe('HelloUsersService', () => {
  let service: HelloUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelloUsersService],
    }).compile();

    service = module.get<HelloUsersService>(HelloUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
