import { IsObjectId } from 'class-validator-mongo-object-id';
import { IsString, IsOptional, IsNumberString } from 'class-validator';

export class ListPlaylistsInput {
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
  @IsObjectId({ message: 'Must be objectId' })
  userId: string;
}