import { WebSocket } from "ws";
import { winnersStore } from "../../db/winnersDb.js";
import { OutgoingMessage } from "../../types/messages.js";

export function handleUpdateWinners(clients: Set<WebSocket>) {
  const winners = winnersStore.getAll();

  const message: OutgoingMessage = {
    type: "update_winners",
    id: 0,
    data: JSON.stringify(winners),
  };

  const rawMessage = JSON.stringify(message);

  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(rawMessage);
    }
  }
}
