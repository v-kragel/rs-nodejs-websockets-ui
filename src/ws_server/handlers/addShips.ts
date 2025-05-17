import { gamesStore } from "../../db/gamesDb.js";
import { AddShipRequestData } from "../../types/messages.js";

export function handleAddShips(payload: AddShipRequestData): void {
  const { gameId, indexPlayer, ships } = payload;

  gamesStore.addShips(gameId, indexPlayer, ships);

  const shouldStartGame = gamesStore.shouldStartGame(gameId);

  if (shouldStartGame) {
    console.log("START THE GAME!!!!!!!!!!!!!!!!!");
  }
}
