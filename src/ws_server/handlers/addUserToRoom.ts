import { WebSocket } from "ws";
import { clientsStore } from "../../db/clientsDb.js";
import { playersStore } from "../../db/playerDb.js";
import { AddUserToRoomRequestData } from "../../types/messages.js";
import { roomsStore } from "../../db/roomDb.js";
import { handleUpdateRoom } from "./updateRoom.js";
import { handleCreateGame } from "./createGame.js";

export function handleAddUserToRoom(
  ws: WebSocket,
  data: AddUserToRoomRequestData
) {
  const playerIndex = clientsStore.getIndexBySocket(ws);

  if (!playerIndex) return;

  const player = playersStore.getByIndex(playerIndex);

  if (!player) return;

  const roomId = data.indexRoom;

  roomsStore.addPlayerToRoom(roomId, player);

  handleUpdateRoom();
  handleCreateGame(roomId);
}
