import { WebSocket } from "ws";
import { roomsStore } from "../../db/roomDb.js";
import { OutgoingMessage } from "../../types/messages.js";

export function handleUpdateRoom(ws: WebSocket) {
  const soloRooms = roomsStore.getSoloRooms();

  const message: OutgoingMessage = {
    type: "update_room",
    id: 0,
    data: JSON.stringify(soloRooms),
  };

  ws.send(JSON.stringify(message));
}
