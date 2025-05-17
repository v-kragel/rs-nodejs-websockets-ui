import { clientsStore } from "../../db/clientsDb.js";
import { roomsStore } from "../../db/roomDb.js";
import { gamesStore } from "../../db/gamesDb.js";
import {
  CreateGameResponseData,
  OutgoingMessage,
} from "../../types/messages.js";
import { sendMessage } from "../../utils/sendMessage.js";

export function handleCreateGame(roomId: string): void {
  const roomUsers = roomsStore.getRoomPlayers(roomId);

  if (!roomUsers) return;

  const indexes = roomUsers.map((u) => u.index);
  const gameClients = indexes.map((i) => ({
    ws: clientsStore.getWsByIndex(i),
    index: i,
  }));
  const game = gamesStore.createGame(indexes);

  gameClients.forEach(({ ws, index }) => {
    if (!ws) return;

    const data: CreateGameResponseData = {
      idGame: game.id,
      idPlayer: index,
    };

    const message: OutgoingMessage = {
      type: "create_game",
      id: 0,
      data: JSON.stringify(data),
    };

    sendMessage(ws, JSON.stringify(message));
  });
}
