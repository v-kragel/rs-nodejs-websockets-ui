import { WebSocket } from "ws";
import {
  RegRequestData,
  RegResponseData,
  OutgoingMessage,
} from "../../types/messages.js";
import { playersStore } from "../../db/playerDb.js";
import { handleUpdateRoom } from "./updateRoom.js";
import { handleUpdateWinners } from "./updateWinners.js";
import { randomUUID } from "node:crypto";
import { clientsStore } from "../../db/clientsDb.js";

export function handleReg(ws: WebSocket, payload: RegRequestData): void {
  const { name, password } = payload;

  const existing = playersStore.getByName(name);

  let response: RegResponseData;

  if (existing) {
    if (existing.password === password) {
      response = {
        name,
        index: existing.index,
        error: false,
        errorText: "",
      };
    } else {
      response = {
        name,
        index: 0,
        error: true,
        errorText: "Invalid password",
      };
    }
  } else {
    const index = randomUUID();

    playersStore.add({ name, password, index });
    clientsStore.addClient(ws, index);

    response = {
      name,
      index: index,
      error: false,
      errorText: "",
    };
  }

  const message: OutgoingMessage = {
    type: "reg",
    id: 0,
    data: JSON.stringify(response),
  };

  ws.send(JSON.stringify(message));

  if (!response.error) {
    handleUpdateRoom(ws);
    handleUpdateWinners();
  }
}
