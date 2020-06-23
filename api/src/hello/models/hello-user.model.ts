/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'HELLO_USERS',
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
