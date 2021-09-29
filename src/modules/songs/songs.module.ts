import { Module } from '@nestjs/common';
import { SongSchema } from './songs.schema';
import { SongsService } from './songs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SongsController } from './songs.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Song',
        schema: SongSchema,
      },
    ]),
  ],
  controllers: [SongsController],
  providers: [SongsService],
  exports: [SongsService],
})
export class SongsModule {}
