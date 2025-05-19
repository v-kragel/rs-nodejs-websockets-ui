import { winnersStore } from "../../db/winnersDb.js";
import { generateWsMessage } from "../../utils/generateWsMessage.js";
import { WebSocket } from "ws";
import { usersStore } from "../../db/userDb.js";
import { sendMessage } from "../../utils/sendMessage.js";
import { UpdateWinnersResponseData } from "../../types/messages.js";

export function handleUpdateWinners() {
  const winners = winnersStore.getAll();

  const data: UpdateWinnersResponseData = winners.map((w) => ({
    name: w.user.name,
    wins: w.wins,
  }));

  const message = generateWsMessage("update_winners", data);

  const openedSockets: WebSocket[] = usersStore.getAllOpenedSockets();

  openedSockets.forEach((ws) => {
    sendMessage(ws, message);
  });
}
