import { BaseStatus } from '@modules/_base/base.interface';
import { IsIn, IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsIn(Object.values(BaseStatus))
  status: BaseStatus;
}
