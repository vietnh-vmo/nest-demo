export interface Playlist extends Document {
  readonly name: string;
  readonly description: string;
  readonly songs: [string];
  readonly private: Boolean;
  readonly collaborators: [string];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly createdBy: string;
  readonly updatedBy: string;
  readonly deletedAt: Date;
}
