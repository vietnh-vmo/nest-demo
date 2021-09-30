import { Model } from 'mongoose';
import { Song } from './songs.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserError } from '@helper/error.helpers';
import { User } from '@modules/users/user.interface';
import { ListSongsInput } from './dto/list-songs.dto';
import { CreateSongInput } from './dto/create-song.dto';
import { UpdateSongInput } from './dto/update-song.dto';
import { StatusCodes } from '@modules/_base/base.interface';
import { DetailInput } from '@modules/_base/dto/detail-input.dto';
import { ListResponse } from '@modules/_base/dto/list-response.dto';

@Injectable()
export class SongsService {
  constructor(@InjectModel('Song') private readonly songModel: Model<Song>) {}

  async create(body: CreateSongInput, reqUser: User): Promise<Song> {
    const song = new this.songModel({
      ...body,
      createdBy: reqUser._id,
    });
    return await song.save();
  }

  async get(query: ListSongsInput): Promise<ListResponse<Song>> {
    let { page, limit } = query;
    const { search } = query;

    page = Number(page) || 1;
    limit = Number(limit) || 20;
    const skip = (Number(page) - 1) * Number(limit);
    const conditions: any = {
      deletedAt: null,
    };

    if (search)
      conditions.$or = [
        { name: { $regex: search.trim(), $options: 'i' } },
        { artist: { $regex: search.trim(), $options: 'i' } },
      ];

    const [data, total] = await Promise.all([
      this.songModel
        .find(conditions)
        .skip(skip)
        .limit(Number(limit))
        .sort({ _id: -1 })
        .lean<[Song]>()
        .exec(),
      this.songModel.countDocuments(conditions).exec(),
    ]);

    return { total, data };
  }

  async getOne({ id }: DetailInput): Promise<Song> {
    const song = await this.songModel
      .findOne({
        _id: id,
        deletedAt: null,
      })
      .lean<Song>()
      .exec();

    if (!song) throw new UserError(StatusCodes.SONG_DO_NOT_EXISTS);

    return song;
  }

  async update(
    { id }: DetailInput,
    body: UpdateSongInput,
    reqUser: User,
  ): Promise<Song> {
    const song = await this.songModel.findOne({
      _id: id,
      deletedAt: null,
    });

    if (!song) throw new UserError(StatusCodes.SONG_DO_NOT_EXISTS);

    if (String(song.createdBy) !== String(reqUser._id))
      throw new UserError(StatusCodes.UNAUTHORIZED);

    song.set({
      ...body,
      updatedAt: new Date(),
      updatedBy: reqUser._id,
    });
    return await song.save();
  }

  async delete({ id }: DetailInput, reqUser: User): Promise<boolean> {
    const song = await this.songModel.findOne({
      _id: id,
      deletedAt: null,
    });

    if (!song) throw new UserError(StatusCodes.SONG_DO_NOT_EXISTS);

    if (String(song.createdBy) !== String(reqUser._id))
      throw new UserError(StatusCodes.UNAUTHORIZED);

    song.set({
      deletedAt: new Date(),
      updatedAt: new Date(),
      updatedBy: reqUser._id,
    });
    await song.save();

    return !!song.deletedAt;
  }
}
