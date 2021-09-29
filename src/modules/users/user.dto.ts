import { BaseStatus } from '@modules/base.interface';

export class ListUserInput {
  page: number;
  limit: number;
  search: string;
  status: BaseStatus;
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
