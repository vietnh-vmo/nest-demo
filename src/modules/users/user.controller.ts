import {
  Get,
  Put,
  Req,
  Post,
  Body,
  Query,
  Param,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';
import {
  User,
  UserResponse,
  ListUserInput,
  CreateUserInput,
  DetailUserInput,
  UpdateUserInput,
  ListUserResponse,
} from './user.interface';
import { Request } from 'express';
import { UserService } from './user.service';
import { RequireAuth } from 'guard/auth.guard';
import { BooleanResponse, StatusCodes } from '@modules/base.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get users
   *
   * @param {ListUserInput} body
   * @returns {Promise<ListUserResponse>}
   */
  @Get()
  @UseGuards(RequireAuth)
  async getAllUsers(@Query() query: ListUserInput): Promise<ListUserResponse> {
    const data = await this.userService.get(query);

    return {
      status: StatusCodes.SUCCESS,
      ...data,
    };
  }

  /**
   * Create user
   *
   * @param {CreateUserInput} body
   * @returns {Promise<UserResponse>}
   */
  @Post()
  @UseGuards(RequireAuth)
  async createUser(
    @Body() body: CreateUserInput,
    @Req() req: Request & { user: User },
  ): Promise<UserResponse> {
    const data = await this.userService.create(body, req.user);

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  /**
   * Get one user
   *
   * @param {DetailUserInput} body
   * @returns {Promise<UserResponse>}
   */
  @Get('/:id')
  @UseGuards(RequireAuth)
  async getOneUser(@Param() param: DetailUserInput): Promise<UserResponse> {
    const data = await this.userService.getOne(param);

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  /**
   * Update user
   *
   * @param {DetailUserInput} param
   * @param {UpdateUserInput} body
   * @returns {Promise<UserResponse>}
   */
  @Put('/:id')
  @UseGuards(RequireAuth)
  async updateEmployee(
    @Param() param: DetailUserInput,
    @Body() body: UpdateUserInput,
    @Req() req: Request & { user: User },
  ): Promise<UserResponse> {
    const data = await this.userService.update(param, body, req.user);
    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  /**
   * Delete employee - CMS
   *
   * @param {DetailUserInput} param
   * @returns {Promise<BooleanResponse>}
   */
  @Delete('/:id')
  @UseGuards(RequireAuth)
  async deleteUser(
    @Param() param: DetailUserInput,
    @Req() req: Request & { user: User },
  ): Promise<BooleanResponse> {
    const data = await this.userService.delete(param, req.user);
    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }
}
