import { User } from "../types/user.js";
import { Winner } from "../types/winner.js";

class WinnersStore {
  private winners: Winner[] = [];

  getAll(): Winner[] {
    return this.winners;
  }

  incrementWin(user: User): void {
    const winner = this.winners.find((w) => w.user.index === user.index);

    if (winner) {
      winner.wins = +1;
    } else {
      this.winners.push({ user, wins: 1 });
    }
  }
}

export const winnersStore = new WinnersStore();
