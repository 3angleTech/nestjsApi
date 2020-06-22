import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HelloUser } from '../models/hello-user.model';

@Injectable()
export class HelloUsersService {
  constructor(
    @InjectModel(HelloUser)
    private userModel: typeof HelloUser,
  ) {}

  async findAll(): Promise<HelloUser[]> {
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<HelloUser> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}