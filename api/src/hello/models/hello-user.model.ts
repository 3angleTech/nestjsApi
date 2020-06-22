import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class HelloUser extends Model<HelloUser> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}