import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistSchema } from './playlists.schema';
import { PlaylistsService } from './playlists.service';
import { UserSchema } from '@modules/users/user.schema';
import { SongSchema } from '@modules/songs/songs.schema';
import { PlaylistsController } from './playlists.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Playlist',
        schema: PlaylistSchema,
      },
      {
        name: 'Song',
        schema: SongSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
  exports: [PlaylistsService],
})
export class PlaylistsModule {}
