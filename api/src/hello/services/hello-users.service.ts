/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { HelloUser } from '../models/hello-user.model';

@Injectable()
export class HelloUsersService {
  constructor(
    @InjectModel(HelloUser)
    private readonly userModel: typeof HelloUser,
  ) { }

  public async findAll(): Promise<HelloUser[]> {
    return this.userModel.findAll();
  }

  public async findOne(id: string): Promise<HelloUser> {
    return this.userModel.findOne({
      where: {
        id: id,
      },
    });
  }

  public async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
