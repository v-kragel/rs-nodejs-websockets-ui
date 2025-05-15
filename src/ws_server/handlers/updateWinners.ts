import { WebSocket } from "ws";
import { winnersStore } from "../../db/winnersDb.js";
import { OutgoingMessage } from "../../types/messages.js";
import { clientsStore } from "../../db/clientsDb.js";

export function handleUpdateWinners() {
  const winners = winnersStore.getAll();
  const clients = clientsStore.getAll();

  const message: OutgoingMessage = {
    type: "update_winners",
    id: 0,
    data: JSON.stringify(winners),
  };

  const rawMessage = JSON.stringify(message);

  for (const [ws] of clients) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(rawMessage);
    }
  }
}
