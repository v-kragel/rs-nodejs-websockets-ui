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
}

export const clientsStore = new ClientsStore();
