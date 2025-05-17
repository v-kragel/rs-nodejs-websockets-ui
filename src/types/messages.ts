import { Ship } from "./ship";

export type MessageType =
  | "reg"
  | "update_room"
  | "update_winners"
  | "create_room"
  | "add_user_to_room"
  | "create_game"
  | "add_ships";

export interface IncomingMessageRaw {
  type: MessageType;
  id: number;
  data: string;
}

export interface OutgoingMessage {
  type: MessageType;
  id: number;
  data: string;
}

export interface RegRequestData {
  name: string;
  password: string;
}

export interface RegResponseData {
  name: string;
  index: string;
  error: boolean;
  errorText: string;
}

export interface AddUserToRoomRequestData {
  indexRoom: string;
}

export interface CreateGameResponseData {
  idGame: string;
  idPlayer: string;
}

export interface AddShipRequestData {
  gameId: string;
  ships: Ship[];
  indexPlayer: string;
}
