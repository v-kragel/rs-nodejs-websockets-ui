import { WebSocket } from "ws";
import { sendMessage } from "../utils/sendMessage.js";

class ClientsStore {
  private clients: Map<WebSocket, string> = new Map();

  addClient(ws: WebSocket, index: string): void {
    this.clients.set(ws, index);
  }

  getIndexBySocket(ws: WebSocket): string | undefined {
    return this.clients.get(ws);
  }

  removeClient(ws: WebSocket): void {
    this.clients.delete(ws);
  }

  getAll(): Map<WebSocket, string> {
    return this.clients;
  }

  getWsByIndex(index: string): WebSocket | null {
    for (const [ws, clientIndex] of this.clients.entries()) {
      if (clientIndex === index) return ws;
    }
    return null;
  }

  sendMessageToOpenedClients(message: string): void {
    for (const [ws] of this.clients) {
      sendMessage(ws, message);
    }
  }

  sendMessageToIndexes(indexes: string[], message: string): void {
    const sockets = indexes.map((index) => this.getWsByIndex(index));

    sockets.forEach((ws) => ws && sendMessage(ws, message));
  }
}

export const clientsStore = new ClientsStore();
