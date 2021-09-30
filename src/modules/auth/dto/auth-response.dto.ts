import { User } from '@modules/users/user.interface';
import { StatusCodes } from '@modules/_base/base.interface';

export class AuthResponse {
  status: StatusCodes;
  user?: User;
  token?: string;
  refreshToken?: string;
  data?: User;
}
