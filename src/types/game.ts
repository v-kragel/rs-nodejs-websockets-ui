import { Ship } from "./ship";

export type GamePlayer = {
  index: string;
  ships: Ship[];
};

export type Game = {
  id: string;
  players: GamePlayer[];
  currentPlayer?: GamePlayer;
};
