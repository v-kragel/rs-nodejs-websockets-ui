import { gamesStore } from "../../db/gamesDb.js";
import { AttackRequestData, AttackResponseData } from "../../types/messages.js";
import { HitResult, Position } from "../../types/game.js";
import { generateWsMessage } from "../../utils/generateWsMessage.js";
import { sendMessage } from "../../utils/sendMessage.js";
import { handleTurn } from "./turn.js";
import { processAttack } from "../../utils/processAttack.js";

export function handleAttack(data: AttackRequestData) {
  const { gameId, x, y, indexPlayer: attackerIndex } = data;

  const game = gamesStore.findById(gameId);
  if (!game) return;

  if (attackerIndex !== game?.currentTurnPlayer?.user?.index) return;

  const target: Position = { x, y };
  const { result, gameOver, winnerId } = processAttack(
    game,
    target,
    attackerIndex
  );

  if (gameOver) {
    console.log("GAME OVER!");
    console.log("winnerId", winnerId);
    return;
  }

  const hitResults = [HitResult.SHOT, HitResult.KILLED];
  const wasHit: boolean = hitResults.includes(result);

  game.players.forEach((player) => {
    const data: AttackResponseData = {
      position: { x, y },
      currentPlayer: attackerIndex,
      status: result,
    };

    const message = generateWsMessage("attack", data);

    sendMessage(player.user.ws, message);
  });

  handleTurn(gameId, wasHit);
}
