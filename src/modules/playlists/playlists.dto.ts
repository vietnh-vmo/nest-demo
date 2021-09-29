export class ListPlaylistsInput {
  page: number;
  limit: number;
  search: string;
  userId: string;
}

export class CreatePlaylistInput {
  name: string;
  description: string;
  songs: [string];
  private: Boolean;
}

export class UpdatePlaylistInput {
  name: string;
  description: string;
  songs: [string];
  private: Boolean;
}

export class AddCollabInput {
  userId: string;
}
