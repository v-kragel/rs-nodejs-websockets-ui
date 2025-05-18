import { Room } from "./room";
import { Position, Ship, HitResult } from "./game";
import { Winner } from "./winner";

export type MessageType =
  | "reg"
  | "update_room"
  | "update_winners"
  | "create_room"
  | "add_user_to_room"
  | "create_game"
  | "add_ships"
  | "start_game"
  | "turn"
  | "attack"
  | "randomAttack"
  | "finish";

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

export type UpdateRoomResponseData = Room[];

export type UpdateWinnersResponseData = Winner[];
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

export interface StartGameResponseData {
  ships: Ship[];
  currentPlayerIndex: string;
}

export interface TurnResponseData {
  currentPlayer: string;
}

export interface AttackRequestData {
  gameId: string;
  x?: number;
  y?: number;
  indexPlayer: string;
}

export interface AttackResponseData {
  position: Position;
  currentPlayer: string;
  status: HitResult;
}

export interface FinishGameResponseData {
  winPlayer: string;
}

export type ResponseType =
  | RegResponseData
  | UpdateRoomResponseData
  | UpdateWinnersResponseData
  | CreateGameResponseData
  | StartGameResponseData
  | TurnResponseData
  | FinishGameResponseData;
