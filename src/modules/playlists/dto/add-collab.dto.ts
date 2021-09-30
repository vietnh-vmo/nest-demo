import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class AddCollabInput {
  @IsNotEmpty()
  @IsObjectId({ message: 'Must be objectId' })
  @ApiProperty({
    description: 'userId',
    required: true,
  })
  userId: string;
}
