import { AttackResult, Game, HitResult, Position } from "../types/game.js";
import { getShipCoordinates } from "./getShipCoordinates.js";
import { isSamePosition } from "./isSamePosition.js";

export function processAttack(
  game: Game,
  target: Position,
  attackerId: string
): AttackResult {
  const defender = game.players.find((p) => p.user.index !== attackerId);
  if (!defender) throw new Error("Defender not found");

  const allTakenHitsPositions = defender.hitsTaken.map((hit) => hit.position);

  const hitShip = defender.ships.find((ship) =>
    getShipCoordinates(ship).some((pos) => isSamePosition(pos, target))
  );

  let result = HitResult.MISS;

  if (hitShip) {
    const shipPositions = getShipCoordinates(hitShip);
    const alreadyHit = shipPositions.filter((pos) =>
      allTakenHitsPositions.some((h) => isSamePosition(h, pos))
    );

    const wasLastPart = alreadyHit.length + 1 === shipPositions.length;
    result = wasLastPart ? HitResult.KILLED : HitResult.SHOT;
  }

  defender.hitsTaken.push({ position: target, result, attackerId });

  const allShipsDestroyed = defender.ships.every((ship) =>
    getShipCoordinates(ship).every((pos) =>
      defender.hitsTaken.some((hit) => isSamePosition(hit.position, pos))
    )
  );

  return {
    result,
    gameOver: allShipsDestroyed,
    winnerId: allShipsDestroyed ? attackerId : undefined,
  };
}
