/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { HelloController } from './controllers/hello.controller';
import { HelloUser } from './models/hello-user.model';
import { HelloUsersService } from './services/hello-users.service';
import { HelloService } from './services/hello.service';

@Module({
  imports: [SequelizeModule.forFeature([HelloUser])],
  controllers: [HelloController],
  providers: [HelloService, HelloUsersService],
})
export class HelloModule { }
