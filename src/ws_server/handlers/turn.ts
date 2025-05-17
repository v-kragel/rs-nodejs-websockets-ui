import { clientsStore } from "../../db/clientsDb.js";
import { gamesStore } from "../../db/gamesDb.js";
import { TurnResponseData } from "../../types/messages.js";
import { generateWsMessage } from "../../utils/generateWsMessage.js";
import { getNextPlayerIndex } from "../../utils/getNextPlayerIndex.js";
import { getRandomPlayerIndex } from "../../utils/getRandomPlayerIndex.js";
import { sendMessage } from "../../utils/sendMessage.js";

export function handleTurn(gameId: string) {
  const game = gamesStore.findById(gameId);

  if (!game) return null;

  const { players, currentPlayer } = game;
  const indices = players.map((p) => p.index);

  let currentTurnPlayer: string | null;

  if (currentPlayer) {
    currentTurnPlayer = getNextPlayerIndex(indices, currentPlayer.index);
  } else {
    currentTurnPlayer = getRandomPlayerIndex(indices);
  }

  if (!currentTurnPlayer) return;

  players.forEach((player) => {
    const ws = clientsStore.getWsByIndex(player.index);

    if (!ws) return;

    const data: TurnResponseData = {
      currentPlayer: currentTurnPlayer,
    };

    const message = generateWsMessage("turn", data);

    sendMessage(ws, message);
  });
}
