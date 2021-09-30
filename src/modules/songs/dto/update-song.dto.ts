import { IsInt, IsArray, IsString, IsNotEmpty } from 'class-validator';

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
