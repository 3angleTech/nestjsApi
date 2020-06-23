/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import { Controller, Get } from '@nestjs/common';

import { HelloUser } from '../models/hello-user.model';
import { HelloUsersService } from '../services/hello-users.service';
import { HelloService } from '../services/hello.service';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService, private readonly helloUsersService: HelloUsersService) { }

  @Get()
  public getAll(): string {
    return this.helloService.getAll();
  }

  @Get('users')
  public async getAllHelloUsers(): Promise<HelloUser[]> {
    return this.helloUsersService.findAll();
  }
}
