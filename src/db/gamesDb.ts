import { randomUUID } from "node:crypto";
import { Game, GamePlayer } from "../types/game.js";
import { Ship } from "../types/ship.js";

class GamesStore {
  private games: Game[] = [];

  getAll(): Game[] {
    return this.games;
  }

  findById(gameId: string): Game | undefined {
    return this.games.find((g) => g.id === gameId);
  }

  createGame(playersIndexes: string[]): Game {
    const id = randomUUID();
    const gamePlayers: GamePlayer[] = playersIndexes.map((index) => ({
      index,
      ships: [],
    }));

    const game = { id, players: gamePlayers };
    this.games.push(game);
    return game;
  }

  addShips(gameId: string, playerIndex: string, ships: Ship[]): void {
    const game = this.findById(gameId);

    if (!game) return;

    const gamePlayer = game.players.find((p) => p.index === playerIndex);

    if (!gamePlayer) return;

    gamePlayer.ships = [...ships];
  }

  shouldStartGame(gameId: string): boolean {
    const game = this.findById(gameId);

    if (!game) return false;

    return game.players.every((p) => !!p.ships.length);
  }
}

export const gamesStore = new GamesStore();
