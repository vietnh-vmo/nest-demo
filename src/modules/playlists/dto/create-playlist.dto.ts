import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreatePlaylistInput {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'playlist name',
    required: true,
    example: 'p1',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'playlist description',
    required: true,
    example: 'playlist 1',
  })
  description: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    description: 'songs Id',
    required: true,
    example: [],
  })
  songs: [string];

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'is playlist private?',
    required: true,
    example: false,
  })
  private: Boolean;
}
