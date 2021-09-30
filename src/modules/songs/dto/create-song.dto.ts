import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsArray, IsString, IsNotEmpty } from 'class-validator';

export class CreateSongInput {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'song name',
    required: true,
    example: 'stairways to heaven',
  })
  name: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    description: 'song genres',
    required: true,
    example: ['rock'],
  })
  genre: [string];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'artist',
    required: true,
    example: 'led zeppelin',
  })
  artist: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    description: 'release year',
    required: true,
    example: 1991,
  })
  released: number;
}
