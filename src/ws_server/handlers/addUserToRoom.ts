import { WebSocket } from "ws";
import { usersStore } from "../../db/userDb.js";
import { AddUserToRoomRequestData } from "../../types/messages.js";
import { roomsStore } from "../../db/roomDb.js";
import { handleUpdateRoom } from "./updateRoom.js";
import { handleCreateGame } from "./createGame.js";

export function handleAddUserToRoom(
  ws: WebSocket,
  data: AddUserToRoomRequestData
) {
  const { indexRoom: roomId } = data;

  const user = usersStore.getBySocket(ws);

  if (!user) return;

  roomsStore.addUserToRoom(roomId, user);

  handleUpdateRoom();

  handleCreateGame(roomId);
}
