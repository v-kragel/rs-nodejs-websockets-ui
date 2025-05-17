import { winnersStore } from "../../db/winnersDb.js";
import { generateWsMessage } from "../../utils/generateWsMessage.js";
import { WebSocket } from "ws";
import { usersStore } from "../../db/userDb.js";
import { sendMessage } from "../../utils/sendMessage.js";

export function handleUpdateWinners() {
  const winners = winnersStore.getAll();

  const message = generateWsMessage("update_winners", winners);

  const openedSockets: WebSocket[] = usersStore.getAllOpenedSockets();

  openedSockets.forEach((ws) => {
    sendMessage(ws, message);
  });
}
