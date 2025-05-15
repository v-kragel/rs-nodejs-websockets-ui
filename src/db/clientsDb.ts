import { WebSocket } from "ws";

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

  sendMessageToOpenedClients(message: string) {
    for (const [ws] of this.clients) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    }
  }
}

export const clientsStore = new ClientsStore();
