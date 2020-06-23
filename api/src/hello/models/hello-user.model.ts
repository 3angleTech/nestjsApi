/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import { Column, Model, Table } from 'sequelize-typescript';

import { TABLE_HELLO_USERS } from '../hello.constants';

@Table({
  tableName: TABLE_HELLO_USERS,
  underscored: true,
})
export class HelloUser extends Model<HelloUser> {
  @Column
  public firstName: string;

  @Column
  public lastName: string;

  @Column({ defaultValue: true })
  public isActive: boolean;
}
