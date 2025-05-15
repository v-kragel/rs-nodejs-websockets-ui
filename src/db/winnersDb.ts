import { Winner } from "../types/winner.js";

class WinnersStore {
  private winners: Winner[] = [];

  getAll(): Winner[] {
    return this.winners;
  }

  incrementWin(name: string) {
    const winner = this.winners.find((w) => w.name === name);
    if (winner) {
      winner.wins += 1;
    } else {
      this.winners.push({ name, wins: 1 });
    }
  }
}

export const winnersStore = new WinnersStore();
