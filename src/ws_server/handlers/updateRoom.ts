import { roomsStore } from "../../db/roomDb.js";
import { OutgoingMessage } from "../../types/messages.js";
import { clientsStore } from "../../db/clientsDb.js";

export function handleUpdateRoom() {
  const soloRooms = roomsStore.getSoloRooms();

  const message: OutgoingMessage = {
    type: "update_room",
    id: 0,
    data: JSON.stringify(soloRooms),
  };

  clientsStore.sendMessageToOpenedClients(JSON.stringify(message));
}
