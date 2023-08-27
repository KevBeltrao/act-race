export interface Lobby {
  code: string;
  users: {
    name: string;
    id: string;
  }[];
}
