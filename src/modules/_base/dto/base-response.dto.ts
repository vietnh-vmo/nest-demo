import { StatusCodes } from '../base.interface';

export class BaseResponse<T> {
  status: StatusCodes;
  data: T;
}
