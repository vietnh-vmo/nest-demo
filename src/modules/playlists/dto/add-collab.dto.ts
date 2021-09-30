import { IsNotEmpty } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class AddCollabInput {
  @IsNotEmpty()
  @IsObjectId({ message: 'Must be objectId' })
  userId: string;
}
