import { Room } from "../types/room.js";

const rooms: Room[] = [];

export const roomStore = {
  getAll: () => rooms,
  getSoloRooms: () => rooms.filter((room) => room.roomUsers.length === 1),
  createRoom: (room: Room) => rooms.push(room),
  clear: () => (rooms.length = 0),
};
