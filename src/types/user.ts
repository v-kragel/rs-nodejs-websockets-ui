import { WebSocket } from "ws";

export type User = {
  index: string;
  name: string;
  password: string;
  ws: WebSocket;
};
