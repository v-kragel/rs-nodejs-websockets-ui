import { roomsStore } from "../../db/roomDb.js";
import { gamesStore } from "../../db/gamesDb.js";
import { CreateGameResponseData } from "../../types/messages.js";
import { sendMessage } from "../../utils/sendMessage.js";
import { generateWsMessage } from "../../utils/generateWsMessage.js";

export function handleCreateGame(roomId: string): void {
  const roomUsers = roomsStore.getRoomUsers(roomId);

  if (!roomUsers) return;

  const game = gamesStore.createGame(roomUsers);

  roomUsers.forEach((user) => {
    const { ws, index } = user;

    const data: CreateGameResponseData = {
      idGame: game.id,
      idPlayer: index,
    };

    const message = generateWsMessage("create_game", data);

    sendMessage(ws, message);
  });
}
