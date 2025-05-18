import { Game, GamePlayer, Position } from "../types/game";

function getAllPositions(): Position[] {
  const positions: Position[] = [];
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      positions.push({ x, y });
    }
  }
  return positions;
}

function getAlreadyAttackedPositions(defender: GamePlayer) {
  return defender.hitsTaken.map((h) => h.position);
}

function getAvailablePositions(defender: GamePlayer) {
  const allPositions = getAllPositions();
  const alreadyAttacked = getAlreadyAttackedPositions(defender);

  const available = allPositions.filter(
    (pos) =>
      !alreadyAttacked.some(
        (hitPos) => hitPos.x === pos.x && hitPos.y === pos.y
      )
  );

  return available;
}

export function getRandomAvailableAttackPosition(
  game: Game,
  attackerId: string
): Position {
  const defender = game.players.find((p) => p.user.index !== attackerId);

  if (!defender) throw new Error("Defender not found");

  const availablePositions = getAvailablePositions(defender);

  if (availablePositions.length === 0) return { x: -1, y: -1 };

  const index = Math.floor(Math.random() * availablePositions.length);
  return availablePositions[index];
}
