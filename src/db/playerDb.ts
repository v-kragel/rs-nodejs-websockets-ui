type Player = {
  login: string;
  password: string;
};

const players: Player[] = [];

export const addPlayer = (login: string, password: string): boolean => {
  if (players.find((p) => p.login === login)) {
    return false;
  }

  players.push({ login, password });

  return true;
};

export const validatePlayer = (login: string, password: string): boolean => {
  return players.some((p) => p.login === login && p.password === password);
};

export const getAllPlayers = (): Player[] => {
  return players;
};
