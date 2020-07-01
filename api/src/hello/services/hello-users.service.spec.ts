/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';

import { HelloUser } from '../models/hello-user.model';

import { HelloUsersService } from './hello-users.service';

describe('HelloUsersService', () => {
  let service: HelloUsersService;

  beforeEach(async () => {
    const mockModel = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HelloUsersService,
        {
          provide: getModelToken(HelloUser),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<HelloUsersService>(HelloUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
