export interface Song extends Document {
  readonly name: string;
  readonly genre: [string];
  readonly artist: string;
  readonly released: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly createdBy: string;
  readonly updatedBy: string;
  readonly deletedAt: Date;
}
