import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'HELLO_USERS',
  underscored: true,
})
export class HelloUser extends Model<HelloUser> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}