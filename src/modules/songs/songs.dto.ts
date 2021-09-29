import {
  IsInt,
  IsArray,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';

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

export class CreateSongInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  genre: [string];

  @IsNotEmpty()
  @IsString()
  artist: string;

  @IsNotEmpty()
  @IsInt()
  released: number;
}

export class UpdateSongInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  genre: [string];

  @IsNotEmpty()
  @IsString()
  artist: string;

  @IsNotEmpty()
  @IsInt()
  released: number;
}
