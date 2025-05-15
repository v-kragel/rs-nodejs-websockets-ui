import { WebSocket, WebSocketServer } from "ws";
import { handleMessage } from "./handleMessage.js";

export const createWsServer = (port: number) => {
  const wss = new WebSocketServer({ port });

  const clients = new Set<WebSocket>();

  wss.on("connection", (ws) => {
    clients.add(ws);
    console.log("Client connected.");

    ws.on("message", (raw: string) => {
      handleMessage(ws, raw.toString(), clients);
    });

    ws.on("close", () => {
      clients.delete(ws);
      console.log("WebSocket was disconnected.");
    });
  });

  return wss;
};
