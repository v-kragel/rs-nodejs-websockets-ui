import { roomsStore } from "../../db/roomDb.js";
import { generateWsMessage } from "../../utils/generateWsMessage.js";
import { usersStore } from "../../db/userDb.js";
import { sendMessage } from "../../utils/sendMessage.js";
import { WebSocket } from "ws";

export function handleUpdateRoom() {
  const soloRooms = roomsStore.getSoloRooms();

  const message = generateWsMessage("update_room", soloRooms);

  const openedSockets: WebSocket[] = usersStore.getAllOpenedSockets();

  openedSockets.forEach((ws) => {
    sendMessage(ws, message);
  });
}
