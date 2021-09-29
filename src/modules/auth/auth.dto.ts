import { StatusCodes } from '@modules/base.interface';
import { User } from '@modules/users/user.interface';

export class LoginInput {
  email: string;
  password: string;
}

export class IDTokenPayload {
  token: string;
  user: User;
}

export class AuthResponse {
  status: StatusCodes;
  user?: User;
  token?: string;
  refreshToken?: string;
  data?: User;
}
