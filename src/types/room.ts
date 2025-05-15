export type RoomUser = {
  name: string;
  index: number | string;
};

export type Room = {
  roomId: string | number;
  roomUsers: RoomUser[];
};
