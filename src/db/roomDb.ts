import { randomUUID } from "node:crypto";
import { Room } from "../types/room.js";
import { User } from "../types/user.js";

class RoomsStore {
  private rooms: Room[] = [];

  getAll(): Room[] {
    return this.rooms;
  }

  getSoloRooms(): Room[] {
    return this.rooms.filter((room) => room.roomUsers.length === 1);
  }

  getById(roomId: string): Room | undefined {
    return this.rooms.find((r) => r.roomId === roomId);
  }

  createRoom(user: User): void {
    const roomId = randomUUID();

    const room: Room = { roomId, roomUsers: [user] };

    this.rooms.push(room);
  }

  addUserToRoom(roomId: string, user: User): Room | null {
    const room = this.getById(roomId);

    if (!room) return null;

    room.roomUsers.push(user);

    return room;
  }

  getRoomUsers(roomId: string): User[] | null {
    const room = this.getById(roomId);

    if (!room) return null;

    return room.roomUsers;
  }
}

export const roomsStore = new RoomsStore();
