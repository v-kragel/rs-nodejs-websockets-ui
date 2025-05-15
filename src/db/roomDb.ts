import { Room } from "../types/room.js";

class RoomsStore {
  private rooms: Room[] = [];

  getAll(): Room[] {
    return this.rooms;
  }

  getSoloRooms(): Room[] {
    return this.rooms.filter((room) => room.roomUsers.length === 1);
  }

  createRoom(room: Room): void {
    this.rooms.push(room);
  }
}

export const roomsStore = new RoomsStore();
