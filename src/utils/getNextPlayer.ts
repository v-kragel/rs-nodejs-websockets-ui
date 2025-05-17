import { GamePlayer } from "../types/game";

export function getNextPlayer(
  players: GamePlayer[],
  current: GamePlayer
): GamePlayer {
  const index = players.findIndex((p) => p.user.index === current.user.index);
  return players[(index + 1) % players.length];
}
