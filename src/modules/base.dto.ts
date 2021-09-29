import { IsNotEmpty } from 'class-validator';
import { StatusCodes } from './base.interface';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class BaseResponse<T> {
  status: StatusCodes;
  data: T;
}

export class DetailInput {
  @IsNotEmpty()
  @IsObjectId({ message: 'Must be objectId' })
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
