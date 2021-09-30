import { IsString, IsOptional, IsNumberString } from 'class-validator';

export class ListSongsInput {
  @IsOptional()
  @IsNumberString({})
  page: number;

  @IsOptional()
  @IsNumberString({})
  limit: number;

  @IsOptional()
  @IsString()
  search: string;
}
