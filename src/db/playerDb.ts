import { Player } from "../types/player.js";

class PlayersStore {
  private players: Player[] = [];

  getAll(): Player[] {
    return this.players;
  }

  getByName(name: string): Player | undefined {
    return this.players.find((p) => p.name === name);
  }

  getByIndex(index: string): Player | undefined {
    return this.players.find((p) => p.index === index);
  }

  add(player: Player): void {
    this.players.push(player);
  }
}

export const playersStore = new PlayersStore();
