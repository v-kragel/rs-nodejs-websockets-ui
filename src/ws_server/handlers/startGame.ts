import { clientsStore } from "../../db/clientsDb.js";
import { gamesStore } from "../../db/gamesDb.js";
import {
  OutgoingMessage,
  StartGameResponseData,
} from "../../types/messages.js";
import { sendMessage } from "../../utils/sendMessage.js";

export function handleStartGame(gameId: string): void {
  const gamePlayers = gamesStore.findById(gameId)?.players;

  if (!gamePlayers) return;

  gamePlayers.forEach((player) => {
    const ws = clientsStore.getWsByIndex(player.index);

    if (!ws) return;

    const data: StartGameResponseData = {
      ships: player.ships,
      currentPlayerIndex: player.index,
    };

    const message: OutgoingMessage = {
      type: "start_game",
      id: 0,
      data: JSON.stringify(data),
    };

    sendMessage(ws, JSON.stringify(message));
  });
}
