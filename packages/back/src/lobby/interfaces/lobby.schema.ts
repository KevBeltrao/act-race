import * as mongoose from 'mongoose';

export const LobbySchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
  },
  { timestamps: true, collection: 'lobbies' },
);
