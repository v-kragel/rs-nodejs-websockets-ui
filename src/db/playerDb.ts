import { Player } from "../types/player.js";

class PlayersStore {
  private players: Player[] = [];

  getAll(): Player[] {
    return this.players;
  }

  findByName(name: string): Player | undefined {
    return this.players.find((p) => p.name === name);
  }

  add(player: Player): void {
    this.players.push(player);
  }

  indexOf(player: Player): number {
    return this.players.indexOf(player);
  }
}

export const playersStore = new PlayersStore();
