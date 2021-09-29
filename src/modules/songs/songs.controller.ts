import {
  Get,
  Put,
  Req,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Controller,
  Query,
} from '@nestjs/common';
import {
  DetailInput,
  ListResponse,
  BaseResponse,
  BooleanResponse,
} from '@modules/base.dto';
import { Request } from 'express';
import { Song } from './songs.interface';
import { SongsService } from './songs.service';
import { RequireAuth } from '@guards/auth.guard';
import { User } from '@modules/users/user.interface';
import { StatusCodes } from '@modules/base.interface';
import { CreateSongInput, ListSongsInput, UpdateSongInput } from './songs.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  /**
   * Create song
   *
   * @param {CreateSongInput} body
   * @returns {Promise<BaseResponse<Song>>}
   */
  @Post()
  @UseGuards(RequireAuth)
  async create(
    @Body() body: CreateSongInput,
    @Req() req: Request & { user: User },
  ): Promise<BaseResponse<Song>> {
    const data = await this.songsService.create(body, req.user);

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  /**
   * Get songs
   *
   * @param {ListSongsInput} body
   * @returns {Promise<ListResponse<Song>>}
   */
  @Get()
  async getAll(@Query() query: ListSongsInput): Promise<ListResponse<Song>> {
    const data = await this.songsService.get(query);

    return {
      status: StatusCodes.SUCCESS,
      ...data,
    };
  }

  /**
   * Get one song
   *
   * @param {DetailInput} body
   * @returns {Promise<BaseResponse<Song>>}
   */
  @Get(':id')
  async getOne(@Param() param: DetailInput): Promise<BaseResponse<Song>> {
    const data = await this.songsService.getOne(param);

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  /**
   * Update song
   *
   * @param {DetailInput} param
   * @param {UpdateSongInput} body
   * @returns {Promise<BaseResponse<Song>>}
   */
  @Put(':id')
  @UseGuards(RequireAuth)
  async update(
    @Param() param: DetailInput,
    @Body() body: UpdateSongInput,
    @Req() req: Request & { user: User },
  ): Promise<BaseResponse<Song>> {
    const data = await this.songsService.update(param, body, req.user);

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  /**
   * Delete song
   *
   * @param {DetailInput} param
   * @returns {Promise<BooleanResponse>}
   */
  @Delete(':id')
  @UseGuards(RequireAuth)
  async delete(
    @Param() param: DetailInput,
    @Req() req: Request & { user: User },
  ): Promise<BooleanResponse> {
    const data = await this.songsService.delete(param, req.user);
    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }
}
