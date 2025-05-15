import { WebSocket } from "ws";
import { roomsStore } from "../../db/roomDb.js";
import { OutgoingMessage } from "../../types/messages.js";

export function handleUpdateRoom(ws: WebSocket, id: number = 0) {
  const soloRooms = roomsStore.getSoloRooms();

  const message: OutgoingMessage = {
    type: "update_room",
    id,
    data: JSON.stringify(soloRooms),
  };

  ws.send(JSON.stringify(message));
}
