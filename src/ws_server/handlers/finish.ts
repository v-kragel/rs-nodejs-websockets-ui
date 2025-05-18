import { winnersStore } from "../../db/winnersDb.js";
import { Game } from "../../types/game.js";
import { FinishGameResponseData } from "../../types/messages.js";
import { User } from "../../types/user.js";
import { generateWsMessage } from "../../utils/generateWsMessage.js";
import { sendMessage } from "../../utils/sendMessage.js";
import { handleUpdateWinners } from "./updateWinners.js";

export function handleFinish(game: Game, winner: User) {
  const { players } = game;

  winnersStore.incrementWin(winner);

  players.forEach((player) => {
    const data: FinishGameResponseData = { winPlayer: winner.index };

    const message = generateWsMessage("finish", data);

    sendMessage(player.user.ws, message);
  });

  handleUpdateWinners();
}
