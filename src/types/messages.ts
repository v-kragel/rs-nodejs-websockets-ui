export type MessageType =
  | "reg"
  | "update_room"
  | "update_winners"
  | "create_room"
  | "add_user_to_room";

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
