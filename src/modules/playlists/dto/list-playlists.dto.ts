import { ApiProperty } from '@nestjs/swagger';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { IsString, IsOptional, IsNumberString } from 'class-validator';

export class ListPlaylistsInput {
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

  @IsOptional()
  @IsObjectId({ message: 'Must be objectId' })
  @ApiProperty({
    description: 'userId',
    example: '',
  })
  userId: string;
}
