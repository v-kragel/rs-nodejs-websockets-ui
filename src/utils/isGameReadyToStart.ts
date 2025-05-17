import { Game } from "../types/game";

export function isGameReadyToStart(game: Game) {
  return game.players.every((p) => !!p.ships.length);
}
