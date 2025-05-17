import { WebSocket } from "ws";
import { RegRequestData, RegResponseData } from "../../types/messages.js";
import { usersStore } from "../../db/userDb.js";
import { handleUpdateRoom } from "./updateRoom.js";
import { handleUpdateWinners } from "./updateWinners.js";
import { generateWsMessage } from "../../utils/generateWsMessage.js";
import { sendMessage } from "../../utils/sendMessage.js";
import { isPasswordValid } from "../../utils/isPasswordValid.js";
import {
  createErrorRegResponse,
  createSuccessRegResponse,
} from "../../utils/getRegResponse.js";

export function handleReg(ws: WebSocket, payload: RegRequestData): void {
  const { name, password } = payload;

  const existing = usersStore.getByName(name);

  let response: RegResponseData;

  if (existing) {
    response = isPasswordValid(existing, password)
      ? createSuccessRegResponse(name, existing.index)
      : createErrorRegResponse(name, "Invalid password");
  } else {
    const user = usersStore.add(name, password, ws);
    response = createSuccessRegResponse(name, user.index);
  }

  const message = generateWsMessage("reg", response);

  sendMessage(ws, message);

  ws.send(JSON.stringify(message));

  if (!response.error) {
    handleUpdateRoom();
    handleUpdateWinners();
  }
}
