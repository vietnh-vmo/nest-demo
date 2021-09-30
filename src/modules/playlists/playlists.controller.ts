import {
  Get,
  Put,
  Req,
  Post,
  Body,
  Param,
  Query,
  Patch,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequireAuth } from '@guards/auth.guard';
import { Playlist } from './playlists.interface';
import { User } from '@modules/users/user.interface';
import { AddCollabInput } from './dto/add-collab.dto';
import { PlaylistsService } from './playlists.service';
import { StatusCodes } from '@modules/_base/base.interface';
import { ListPlaylistsInput } from './dto/list-playlists.dto';
import { CreatePlaylistInput } from './dto/create-playlist.dto';
import { UpdatePlaylistInput } from './dto/update-playlist.dto';
import { DetailInput } from '@modules/_base/dto/detail-input.dto';
import { BaseResponse } from '@modules/_base/dto/base-response.dto';
import { ListResponse } from '@modules/_base/dto/list-response.dto';
import { BooleanResponse } from '@modules/_base/dto/bool-response.dto';

@ApiTags('playlists')
@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  /**
   * Create playlist
   *
   * @param {CreatePlaylistInput} body
   * @returns {Promise<BaseResponse<Playlist>>}
   */
  @Post()
  @UseGuards(RequireAuth)
  async create(
    @Body() body: CreatePlaylistInput,
    @Req() req: Request & { user: User },
  ): Promise<BaseResponse<Playlist>> {
    const data = await this.playlistsService.create(body, req.user);

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  /**
   * Get playlists
   *
   * @param {ListPlaylistsInput} body
   * @returns {Promise<ListResponse<Playlist>>}
   */
  @Get()
  @UseGuards(RequireAuth)
  async getAll(
    @Query() query: ListPlaylistsInput,
    @Req() req: Request & { user: User },
  ): Promise<ListResponse<Playlist>> {
    const data = await this.playlistsService.get(query, req.user);

    return {
      status: StatusCodes.SUCCESS,
      ...data,
    };
  }

  /**
   * Get one playlist
   *
   * @param {DetailInput} body
   * @returns {Promise<BaseResponse<Playlist>>}
   */
  @Get(':id')
  @UseGuards(RequireAuth)
  async getOne(
    @Param() param: DetailInput,
    @Req() req: Request & { user: User },
  ): Promise<BaseResponse<Playlist>> {
    const data = await this.playlistsService.getOne(param, req.user);

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  /**
   * Update playlist
   *
   * @param {DetailInput} param
   * @param {UpdatePlaylistInput} body
   * @returns {Promise<BaseResponse<Playlist>>}
   */
  @Put(':id')
  @UseGuards(RequireAuth)
  async update(
    @Param() param: DetailInput,
    @Body() body: UpdatePlaylistInput,
    @Req() req: Request & { user: User },
  ): Promise<BaseResponse<Playlist>> {
    const data = await this.playlistsService.update(param, body, req.user);

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  /**
   * Delete playlist
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
    const data = await this.playlistsService.delete(param, req.user);
    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }

  /**
   * Add collaborator playlist
   *
   * @param {DetailInput} param
   * @param {AddCollabInput} body
   * @returns {Promise<BaseResponse<Playlist>>}
   */
  @Patch(':id/collab')
  @UseGuards(RequireAuth)
  async addCollaborator(
    @Param() param: DetailInput,
    @Body() body: AddCollabInput,
    @Req() req: Request & { user: User },
  ): Promise<BaseResponse<Playlist>> {
    const data = await this.playlistsService.addCollaborator(
      param,
      body,
      req.user,
    );

    return {
      status: StatusCodes.SUCCESS,
      data,
    };
  }
}
