import { Winner } from "../types/winner.js";

class WinnersStore {
  private winners: Winner[] = [];

  getAll(): Winner[] {
    return this.winners;
  }
}

export const winnersStore = new WinnersStore();
