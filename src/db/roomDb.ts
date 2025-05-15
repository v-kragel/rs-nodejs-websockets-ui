import { randomUUID } from "node:crypto";
import { Room } from "../types/room.js";
import { Player } from "../types/player.js";

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

  createRoom({ name, index }: Player): void {
    const roomId = randomUUID();
    const room: Room = { roomId, roomUsers: [{ name, index }] };
    this.rooms.push(room);
  }

  addPlayerToRoom(roomId: string, { name, index }: Player): Room | null {
    const room = this.getById(roomId);

    if (!room) return null;

    room.roomUsers.push({ name, index });

    return room;
  }
}

export const roomsStore = new RoomsStore();
