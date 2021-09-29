import { StatusCodes } from '@modules/base.interface';
import { User } from '@modules/users/user.interface';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginInput {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
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
