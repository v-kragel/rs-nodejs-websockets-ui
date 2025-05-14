import { WebSocket } from "ws";
import { IncomingMessageRaw } from "../types/messages.js";
import { handleReg } from "./handlers/reg.js";

export function handleMessage(ws: WebSocket, raw: string): void {
  let message: IncomingMessageRaw;

  try {
    message = JSON.parse(raw);
  } catch (err) {
    console.error("Malformed JSON message");
    return;
  }

  let parsedData: any;

  try {
    parsedData = JSON.parse(message.data);
  } catch (err) {
    console.error("Malformed data field (should be JSON string)");
    return;
  }

  switch (message.type) {
    case "reg":
      handleReg(ws, message.id, parsedData);
      break;

    default:
      console.warn(`Unknown message type: ${message.type}`);
  }
}
