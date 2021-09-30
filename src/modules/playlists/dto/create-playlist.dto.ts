import { IsArray, IsString, IsBoolean, IsNotEmpty } from 'class-validator';

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
