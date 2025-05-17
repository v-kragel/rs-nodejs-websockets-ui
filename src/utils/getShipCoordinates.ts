import { Ship } from "../types/game";

export function getShipCoordinates(ship: Ship): { x: number; y: number }[] {
  return Array.from({ length: ship.length }).map((_, i) => ({
    x: ship.direction ? ship.position.x : ship.position.x + i,
    y: ship.direction ? ship.position.y + i : ship.position.y,
  }));
}
