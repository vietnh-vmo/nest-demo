import { User } from './user.interface';
import { BaseStatus, StatusCodes } from '@modules/base.interface';

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
