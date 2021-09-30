import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Playlist } from './playlists.interface';
import { UserError } from '@helper/error.helpers';
import { User } from '@modules/users/user.interface';
import { AddCollabInput } from './dto/add-collab.dto';
import { StatusCodes } from '@modules/_base/base.interface';
import { ListPlaylistsInput } from './dto/list-playlists.dto';
import { CreatePlaylistInput } from './dto/create-playlist.dto';
import { UpdatePlaylistInput } from './dto/update-playlist.dto';
import { DetailInput } from '@modules/_base/dto/detail-input.dto';
import { ListResponse } from '@modules/_base/dto/list-response.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectModel('Playlist') private readonly playlistModel: Model<Playlist>,
  ) {}

  async create(body: CreatePlaylistInput, reqUser: User): Promise<Playlist> {
    const playlist = new this.playlistModel({
      ...body,
      createdBy: reqUser._id,
    });
    return await playlist.save();
  }

  async get(
    query: ListPlaylistsInput,
    reqUser: User,
  ): Promise<ListResponse<Playlist>> {
    let { page, limit } = query;
    const { search, userId } = query;

    page = Number(page) || 1;
    limit = Number(limit) || 20;
    const skip = (Number(page) - 1) * Number(limit);
    const conditions: any = {
      deletedAt: null,
    };

    if (search)
      conditions.$or = [
        { name: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
      ];

    if (userId) {
      if (userId === String(reqUser._id)) {
        conditions.$or = [
          { createdBy: userId },
          { collaborators: { $elemMatch: { $eq: userId } } },
        ];
      } else {
        conditions.private = false;
        conditions.$or = [
          { createdBy: userId },
          { collaborators: { $elemMatch: { $eq: userId } } },
        ];
      }
    } else {
      conditions.$or = [
        { createdBy: reqUser._id },
        { collaborators: { $elemMatch: { $eq: reqUser._id } } },
      ];
    }

    const [data, total] = await Promise.all([
      this.playlistModel
        .find(conditions)
        .skip(skip)
        .limit(Number(limit))
        .sort({ _id: -1 })
        .lean<[Playlist]>()
        .exec(),
      this.playlistModel.countDocuments(conditions).exec(),
    ]);

    return { total, data };
  }

  async getOne({ id }: DetailInput, reqUser: User): Promise<Playlist> {
    const playlist = await this.playlistModel
      .findOne({
        _id: id,
        deletedAt: null,
      })
      .lean<Playlist>()
      .exec();

    if (!playlist) throw new UserError(StatusCodes.PLAYLIST_DO_NOT_EXISTS);

    // only owner and collaborators can view
    if (playlist.private)
      if (
        String(reqUser._id) !== String(playlist.createdBy) &&
        !playlist.collaborators
          .map((i) => String(i))
          .includes(String(reqUser._id))
      )
        throw new UserError(StatusCodes.UNAUTHORIZED);

    return playlist;
  }

  async update(
    { id }: DetailInput,
    body: UpdatePlaylistInput,
    reqUser: User,
  ): Promise<Playlist> {
    const playlist = await this.playlistModel.findOne({
      _id: id,
      deletedAt: null,
    });

    if (!playlist) throw new UserError(StatusCodes.PLAYLIST_DO_NOT_EXISTS);

    // only owner and collaborators can update
    if (
      String(reqUser._id) !== String(playlist.createdBy) &&
      !playlist.collaborators
        .map((i) => String(i))
        .includes(String(reqUser._id))
    )
      throw new UserError(StatusCodes.UNAUTHORIZED);

    playlist.set({
      ...body,
      updatedAt: new Date(),
      updatedBy: reqUser._id,
    });
    return await playlist.save();
  }

  async delete({ id }: DetailInput, reqUser: User): Promise<boolean> {
    const playlist = await this.playlistModel.findOne({
      _id: id,
      deletedAt: null,
    });

    if (!playlist) throw new UserError(StatusCodes.PLAYLIST_DO_NOT_EXISTS);

    // only owner and collaborators can delete
    if (
      String(reqUser._id) !== String(playlist.createdBy) &&
      !playlist.collaborators
        .map((i) => String(i))
        .includes(String(reqUser._id))
    )
      throw new UserError(StatusCodes.UNAUTHORIZED);

    playlist.set({
      deletedAt: new Date(),
      updatedAt: new Date(),
      updatedBy: reqUser._id,
    });
    await playlist.save();

    return !!playlist.deletedAt;
  }

  async addCollaborator(
    { id }: DetailInput,
    { userId }: AddCollabInput,
    reqUser: User,
  ): Promise<Playlist> {
    const playlist = await this.playlistModel.findOne({
      _id: id,
      deletedAt: null,
    });

    if (!playlist) throw new UserError(StatusCodes.PLAYLIST_DO_NOT_EXISTS);

    // only owner and collaborators can update
    if (
      String(reqUser._id) !== String(playlist.createdBy) &&
      !playlist.collaborators
        .map((i) => String(i))
        .includes(String(reqUser._id))
    )
      throw new UserError(StatusCodes.UNAUTHORIZED);

    playlist.collaborators.push(userId);
    playlist.set({
      updatedAt: new Date(),
      updatedBy: reqUser._id,
    });
    return await playlist.save();
  }
}
