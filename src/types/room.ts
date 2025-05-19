import { User } from "./user";

export type Room = {
  roomId: string;
  roomUsers: User[];
};
