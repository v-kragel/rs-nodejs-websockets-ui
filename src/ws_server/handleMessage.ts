import { WebSocket } from "ws";
import { IncomingMessageRaw } from "../types/messages.js";
import { handleReg } from "./handlers/reg.js";
import { handleCreateRoom } from "./handlers/createRoom.js";
import { handleAddUserToRoom } from "./handlers/addUserToRoom.js";
import { handleAddShips } from "./handlers/addShips.js";
import { handleAttack } from "./handlers/attack.js";
import { logger } from "../utils/logger.js";

export function handleMessage(ws: WebSocket, raw: string): void {
  let message: IncomingMessageRaw;

  try {
    message = JSON.parse(raw);
  } catch (err) {
    console.error("Malformed JSON message");
    return;
  }

  logger("Received request with message type: ", message.type);

  let parsedData: any;

  try {
    parsedData = JSON.parse(message.data || "{}");
  } catch (err) {
    console.error("Malformed data field (should be JSON string)");
    return;
  }

  logger("Parsed message data: ", parsedData);

  switch (message.type) {
    case "reg":
      handleReg(ws, parsedData);
      break;

    case "create_room":
      handleCreateRoom(ws);
      break;

    case "add_user_to_room":
      handleAddUserToRoom(ws, parsedData);
      break;

    case "add_ships":
      handleAddShips(parsedData);
      break;

    case "attack":
    case "randomAttack":
      handleAttack(parsedData);
      break;

    default:
      console.warn(`Unknown message type: ${message.type}`);
  }
}
