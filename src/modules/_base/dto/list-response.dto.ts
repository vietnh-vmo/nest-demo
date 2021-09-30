import { StatusCodes } from '../base.interface';

export class ListResponse<T> {
  status?: StatusCodes;
  total: number;
  data: T[];
}
