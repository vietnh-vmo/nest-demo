import {
  IsIn,
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumberString,
  IsEnum,
} from 'class-validator';
import { BaseStatus } from '@modules/base.interface';

export class ListUserInput {
  @IsOptional()
  @IsNumberString({})
  page: number;

  @IsOptional()
  @IsNumberString({})
  limit: number;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsEnum(BaseStatus)
  status: BaseStatus;
}
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}

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
