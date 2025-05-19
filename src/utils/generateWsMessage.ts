import { MessageType, OutgoingMessage, ResponseType } from "../types/messages";

export function generateWsMessage(
  type: MessageType,
  data: ResponseType
): string {
  const message: OutgoingMessage = {
    type,
    id: 0,
    data: JSON.stringify(data),
  };

  return JSON.stringify(message);
}
