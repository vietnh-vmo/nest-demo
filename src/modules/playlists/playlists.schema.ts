import * as mongoose from 'mongoose';
import { Playlist } from './playlists.interface';

const ObjectId = mongoose.Types.ObjectId;

export const PlaylistSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    songs: [
      {
        type: ObjectId,
        ref: 'Song',
        default: [],
      },
    ],
    private: {
      type: Boolean,
      default: true,
    },
    collaborators: [
      {
        type: ObjectId,
        ref: 'User',
        default: [],
      },
    ],
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

export const PlaylistModel = mongoose.model<Playlist>(
  'Playlist',
  PlaylistSchema,
  'Playlists',
);
