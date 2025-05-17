import { User } from "./user";

export type Position = {
  x: number;
  y: number;
};

export type ShipType = "small" | "medium" | "large" | "huge";

export type Ship = {
  position: Position;
  direction: boolean;
  length: number;
  type: ShipType;
};

export type Game = {
  id: string;
  players: GamePlayer[];
  currentTurnPlayer: GamePlayer | undefined;
};

export enum HitResult {
  MISS = "miss",
  KILLED = "killed",
  SHOT = "shot",
}

export type RecorderHit = {
  position: Position;
  result: HitResult;
  attackerId: string;
};

export type GamePlayer = {
  user: User;
  ships: Ship[];
  hitsTaken: RecorderHit[];
};

export type AttackResult = {
  result: HitResult;
  gameOver: boolean;
  winnerId?: string;
};
