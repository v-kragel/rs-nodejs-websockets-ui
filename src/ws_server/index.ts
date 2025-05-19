import { WebSocketServer } from "ws";
import { handleMessage } from "./handleMessage.js";
import { usersStore } from "../db/userDb.js";

export const createWsServer = (port: number) => {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (ws) => {
    console.log("Client connected.");

    ws.on("message", (raw: string) => {
      handleMessage(ws, raw.toString());
    });

    ws.on("close", () => {
      console.log("WebSocket was disconnected.");
      usersStore.remove(ws);
    });
  });

  return wss;
};
