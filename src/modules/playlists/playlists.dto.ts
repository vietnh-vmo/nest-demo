import {
  IsArray,
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsNumberString,
} from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

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

export class CreatePlaylistInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  songs: [string];

  @IsNotEmpty()
  @IsBoolean()
  private: Boolean;
}

export class UpdatePlaylistInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  songs: [string];

  @IsNotEmpty()
  @IsBoolean()
  private: Boolean;
}

export class AddCollabInput {
  @IsNotEmpty()
  @IsObjectId({ message: 'Must be objectId' })
  userId: string;
}
