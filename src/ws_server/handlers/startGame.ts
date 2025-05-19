import { gamesStore } from "../../db/gamesDb.js";
import { StartGameResponseData } from "../../types/messages.js";
import { generateWsMessage } from "../../utils/generateWsMessage.js";
import { sendMessage } from "../../utils/sendMessage.js";

export function handleStartGame(gameId: string): void {
  const gamePlayers = gamesStore.findById(gameId)?.players;

  if (!gamePlayers) return;

  gamePlayers.forEach((player) => {
    const data: StartGameResponseData = {
      ships: player.ships,
      currentPlayerIndex: player.user.index,
    };

    const message = generateWsMessage("start_game", data);

    sendMessage(player.user.ws, message);
  });
}
