import { randomUUID } from "node:crypto";
import { User } from "../types/user.js";
import { WebSocket } from "ws";

class UsersStore {
  private users: User[] = [];
  private sockets: Map<WebSocket, User> = new Map();

  getAll(): User[] {
    return this.users;
  }

  getByName(name: string): User | undefined {
    return this.users.find((p) => p.name === name);
  }

  getByIndex(index: string): User | undefined {
    return this.users.find((p) => p.index === index);
  }

  getBySocket(ws: WebSocket): User | undefined {
    return this.sockets.get(ws);
  }

  getAllOpenedSockets(): WebSocket[] {
    const openedSockets: WebSocket[] = [];

    for (const [ws] of this.sockets) {
      if (ws?.readyState === WebSocket.OPEN) {
        openedSockets.push(ws);
      }
    }

    return openedSockets;
  }

  add(name: string, password: string, ws: WebSocket): User {
    const index = randomUUID();

    const user = { index, name, password, ws };

    this.users.push(user);

    this.sockets.set(ws, user);

    return user;
  }
}

export const usersStore = new UsersStore();
