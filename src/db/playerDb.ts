import { Player } from "../types/player";

const players: Player[] = [];

export const playerStore = {
  getAll: () => players,
  findByName: (name: string) => players.find((p) => p.name === name),
  add: (player: Player) => players.push(player),
  indexOf: (player: Player) => players.indexOf(player),
};
