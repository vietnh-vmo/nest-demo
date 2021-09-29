import { AuthService } from './auth.service';
import { StatusCodes } from '@modules/base.interface';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthResponse, LoginInput } from '@modules/auth/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login
   *
   * @param {LoginInput} body
   * @returns {Promise<AuthResponse>}
   */
  @Post('login')
  async login(@Body() body: LoginInput): Promise<AuthResponse> {
    const data = await this.authService.login(body);

    return {
      status: StatusCodes.SUCCESS,
      ...data,
    };
  }
}
