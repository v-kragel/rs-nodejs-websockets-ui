import { WebSocket } from "ws";
import { clientsStore } from "../../db/clientsDb.js";
import { playersStore } from "../../db/playerDb.js";
import { roomsStore } from "../../db/roomDb.js";
import { handleUpdateRoom } from "./updateRoom.js";

export function handleCreateRoom(ws: WebSocket) {
  const clientIndex = clientsStore.getIndexBySocket(ws);

  if (!clientIndex) return;

  const player = playersStore.getByIndex(clientIndex);

  if (!player) return;

  roomsStore.createRoom(player);

  handleUpdateRoom(ws);
}
