import { BaseStatus } from '@modules/_base/base.interface';
import { IsEnum, IsString, IsOptional, IsNumberString } from 'class-validator';

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