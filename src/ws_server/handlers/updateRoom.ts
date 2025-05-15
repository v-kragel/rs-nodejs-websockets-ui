import { WebSocket } from "ws";
import { roomStore } from "../../db/roomDb.js";
import { OutgoingMessage } from "../../types/messages.js";

export function handleUpdateRoom(ws: WebSocket, id: number = 0) {
  const soloRooms = roomStore.getSoloRooms();

  const message: OutgoingMessage = {
    type: "update_room",
    id,
    data: JSON.stringify(soloRooms),
  };

  ws.send(JSON.stringify(message));
}
