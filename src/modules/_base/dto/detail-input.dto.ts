import { IsNotEmpty } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class DetailInput {
  @IsNotEmpty()
  @IsObjectId({ message: 'Must be objectId' })
  id: string;
}
