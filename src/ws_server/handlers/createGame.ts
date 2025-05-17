import { clientsStore } from "../../db/clientsDb.js";
import { roomsStore } from "../../db/roomDb.js";
import { gamesStore } from "../../db/gamesDb.js";
import { CreateGameResponseData } from "../../types/messages.js";
import { sendMessage } from "../../utils/sendMessage.js";
import { generateWsMessage } from "../../utils/generateWsMessage.js";

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

    const message = generateWsMessage("create_game", data);

    sendMessage(ws, message);
  });
}
