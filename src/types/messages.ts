export type MessageType = "reg" | "update_room" | "update_winners";

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

// ========== REG ==========
export interface RegRequestData {
  name: string;
  password: string;
}

export interface RegResponseData {
  name: string;
  index: number | string;
  error: boolean;
  errorText: string;
}
