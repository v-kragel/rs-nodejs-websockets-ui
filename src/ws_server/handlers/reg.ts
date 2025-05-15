import { WebSocket } from "ws";
import {
  RegRequestData,
  RegResponseData,
  OutgoingMessage,
} from "../../types/messages.js";
import { playersStore } from "../../db/playerDb.js";
import { handleUpdateRoom } from "./updateRoom.js";
import { handleUpdateWinners } from "./updateWinners.js";

export function handleReg(
  ws: WebSocket,
  id: number,
  payload: RegRequestData,
  clients: Set<WebSocket>
): void {
  const { name, password } = payload;

  const existing = playersStore.findByName(name);

  let response: RegResponseData;

  if (existing) {
    if (existing.password === password) {
      response = {
        name,
        index: playersStore.indexOf(existing),
        error: false,
        errorText: "",
      };
    } else {
      response = {
        name,
        index: -1,
        error: true,
        errorText: "Invalid password",
      };
    }
  } else {
    playersStore.add({ name, password });

    response = {
      name,
      index: playersStore.getAll().length - 1,
      error: false,
      errorText: "",
    };
  }

  const message: OutgoingMessage = {
    type: "reg",
    id,
    data: JSON.stringify(response),
  };

  ws.send(JSON.stringify(message));

  if (!response.error) {
    handleUpdateRoom(ws);
    handleUpdateWinners(clients);
  }
}
