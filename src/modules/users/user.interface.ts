import { BaseStatus, StatusCodes } from '../base.interface';

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

export class ListUserInput {
  page: number;
  limit: number;
  search: string;
  status: BaseStatus;
}

export class ListUserResponse {
  status?: StatusCodes;
  total: number;
  data: User[];
}

export class CreateUserInput {
  name: string;
  email: string;
  password: string;
  address: string;
}

export class UpdateUserInput {
  name: string;
  password: string;
  address: string;
  status: BaseStatus;
}

export class UserResponse {
  status: StatusCodes;
  data: User;
}

export class DetailUserInput {
  id: string;
}
