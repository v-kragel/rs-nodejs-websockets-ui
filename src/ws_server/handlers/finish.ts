import { Game } from "../../types/game.js";
import { FinishGameResponseData } from "../../types/messages.js";
import { generateWsMessage } from "../../utils/generateWsMessage.js";
import { sendMessage } from "../../utils/sendMessage.js";
import { handleUpdateWinners } from "./updateWinners.js";

export function handleFinish(game: Game, winnerIndex: string) {
  const { players } = game;

  players.forEach((player) => {
    const data: FinishGameResponseData = { winPlayer: winnerIndex };

    const message = generateWsMessage("finish", data);

    sendMessage(player.user.ws, message);
  });

  handleUpdateWinners();
}
