import { WebSocket } from "ws";
import {
  RegRequestData,
  RegResponseData,
  OutgoingMessage,
} from "../../types/messages.js";
import { playerStore } from "../../db/playerDb.js";
import { handleUpdateRoom } from "./updateRoom.js";

export function handleReg(
  ws: WebSocket,
  id: number,
  payload: RegRequestData
): void {
  const { name, password } = payload;

  const existing = playerStore.findByName(name);

  let response: RegResponseData;

  if (existing) {
    if (existing.password === password) {
      response = {
        name,
        index: playerStore.indexOf(existing),
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
    playerStore.add({ name, password });

    response = {
      name,
      index: playerStore.getAll().length - 1,
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
    handleUpdateRoom(ws)
  }
}
