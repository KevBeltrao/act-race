import * as mongoose from 'mongoose';

export const LobbySchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    users: {
      type: [
        {
          id: { type: String, required: true },
          name: { type: String, required: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true, collection: 'lobbies' },
);
