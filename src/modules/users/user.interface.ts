import { BaseStatus } from '../_base/base.interface';

export interface User extends Document {
  readonly _id: string;
  readonly name: string;
  readonly email: string;
  password: string;
  readonly address: string;
  readonly status: BaseStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly createdBy: string;
  readonly updatedBy: string;
  readonly deletedAt: Date;

  // methods
  matchPassword: Function;
}
