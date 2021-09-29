import { BaseStatus } from '@modules/base.interface';

export class ListSongsInput {
  page: number;
  limit: number;
  search: string;
}

export class CreateSongInput {
  name: string;
  genre: [string];
  artist: string;
  released: number;
}

export class UpdateSongInput {
  name: string;
  password: string;
  address: string;
  status: BaseStatus;
}
