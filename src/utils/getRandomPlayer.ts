import { GamePlayer } from "../types/game";

export function getRandomPlayer(players: GamePlayer[]): GamePlayer {
  const index = Math.floor(Math.random() * players.length);
  return players[index];
}
