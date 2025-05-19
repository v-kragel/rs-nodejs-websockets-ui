import { WebSocket } from "ws";
import { usersStore } from "../../db/userDb.js";
import { roomsStore } from "../../db/roomDb.js";
import { handleUpdateRoom } from "./updateRoom.js";

export function handleCreateRoom(ws: WebSocket) {
  const user = usersStore.getBySocket(ws);

  if (!user) return;

  roomsStore.createRoom(user);

  handleUpdateRoom();
}
