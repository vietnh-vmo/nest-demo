import { StatusCodes } from './base.interface';

export class BaseResponse<T> {
  status: StatusCodes;
  data: T;
}

export class DetailInput {
  id: string;
}

export class ListResponse<T> {
  status?: StatusCodes;
  total: number;
  data: T[];
}

export class BooleanResponse {
  status: StatusCodes;
  data: boolean;
}
