import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumberString } from 'class-validator';

export class ListSongsInput {
  @IsOptional()
  @IsNumberString({})
  @ApiProperty({
    description: 'page',
    example: 1,
  })
  page: number;

  @IsOptional()
  @IsNumberString({})
  @ApiProperty({
    description: 'limit',
    example: 20,
  })
  limit: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'search',
    example: '',
  })
  search: string;
}
