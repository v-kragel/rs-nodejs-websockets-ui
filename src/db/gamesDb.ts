import { randomUUID } from "node:crypto";
import { Game, GamePlayer, Ship } from "../types/game.js";
import { User } from "../types/user.js";
import { getRandomPlayer } from "../utils/getRandomPlayer.js";
import { getNextPlayer } from "../utils/getNextPlayer.js";

class GamesStore {
  private games: Game[] = [];

  getAll(): Game[] {
    return this.games;
  }

  findById(gameId: string): Game | undefined {
    return this.games.find((g) => g.id === gameId);
  }

  findGamePlayerByIndex(index: string): GamePlayer | undefined {
    const allPlayers = this.games.flatMap((g) => g.players);

    return allPlayers.find((p) => p.user.index === index);
  }

  createGame(users: User[]): Game {
    const id = randomUUID();

    const gamePlayers: GamePlayer[] = users.map((user) => ({
      user,
      ships: [],
      hitsTaken: [],
    }));

    const game: Game = {
      id,
      players: gamePlayers,
      currentTurnPlayer: undefined,
    };

    this.games.push(game);

    return game;
  }

  removeGame(gameId: string): void {
    this.games = this.games.filter((g) => g.id !== gameId);
  }

  addShips(gameId: string, playerIndex: string, ships: Ship[]): void {
    const game = this.findById(gameId);

    if (!game) return;

    const gamePlayer = game.players.find((p) => p.user.index === playerIndex);

    if (!gamePlayer) return;

    gamePlayer.ships = [...ships];
  }

  switchTurn(gameId: string, wasHit: boolean) {
    const game = this.findById(gameId);

    if (!game) return;

    if (wasHit) return;

    const { players, currentTurnPlayer } = game;

    if (!currentTurnPlayer) {
      game.currentTurnPlayer = getRandomPlayer(players);
    } else {
      game.currentTurnPlayer = getNextPlayer(players, currentTurnPlayer);
    }
  }
}

export const gamesStore = new GamesStore();
