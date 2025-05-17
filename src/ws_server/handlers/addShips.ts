import { gamesStore } from "../../db/gamesDb.js";
import { AddShipRequestData } from "../../types/messages.js";
import { isGameReadyToStart } from "../../utils/isGameReadyToStart.js";
import { handleStartGame } from "./startGame.js";
import { handleTurn } from "./turn.js";

export function handleAddShips(payload: AddShipRequestData): void {
  const { gameId, indexPlayer, ships } = payload;

  gamesStore.addShips(gameId, indexPlayer, ships);

  const game = gamesStore.findById(gameId);

  if (!game) return;

  const shouldStartGame = isGameReadyToStart(game);

  if (shouldStartGame) {
    handleStartGame(gameId);
    handleTurn(gameId);
  }
}
