/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';

import { AppConfigurationModule } from '../../app-configuration/app-configuration.module';
import { HelloUser } from '../models/hello-user.model';

import { HelloService } from './hello.service';

describe('HelloService', () => {
  let service: HelloService;

  beforeEach(async () => {
    const mockModel = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HelloService,
        {
          provide: getModelToken(HelloUser),
          useValue: mockModel,
        },
      ],
      imports: [AppConfigurationModule],
    }).compile();

    service = module.get<HelloService>(HelloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
