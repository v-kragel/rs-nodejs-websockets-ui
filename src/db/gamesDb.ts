import { randomUUID } from "node:crypto";
import { Game } from "../types/game.js";
import { Player } from "../types/player.js";

class GamesStore {
  private games: Game[] = [];

  getAll(): Game[] {
    return this.games;
  }

  createGame(playersIndexes: string[]): Game {
    const id = randomUUID();
    const game = { id, playersIndexes };
    this.games.push(game);
    return game;
  }
}

export const gamesStore = new GamesStore();
