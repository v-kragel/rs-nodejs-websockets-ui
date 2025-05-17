import { gamesStore } from "../../db/gamesDb.js";
import { TurnResponseData } from "../../types/messages.js";
import { generateWsMessage } from "../../utils/generateWsMessage.js";
import { sendMessage } from "../../utils/sendMessage.js";

export function handleTurn(gameId: string, wasHit: boolean = false) {
  gamesStore.switchTurn(gameId, wasHit);

  const game = gamesStore.findById(gameId);

  if (!game) return;

  const { players, currentTurnPlayer } = game;

  players.forEach((player) => {
    const data: TurnResponseData = {
      currentPlayer: currentTurnPlayer?.user?.index || "",
    };

    const message = generateWsMessage("turn", data);

    sendMessage(player.user.ws, message);
  });
}
