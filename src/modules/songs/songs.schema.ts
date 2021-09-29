import * as mongoose from 'mongoose';
import { Song } from './songs.interface';

const ObjectId = mongoose.Types.ObjectId;

export const SongSchema = new mongoose.Schema(
  {
    name: String,
    genre: [String],
    artist: String,
    released: Number,
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    updatedAt: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: ObjectId,
      ref: 'User',
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { strict: false },
);

export const SongModel = mongoose.model<Song>('Song', SongSchema, 'Songs');
