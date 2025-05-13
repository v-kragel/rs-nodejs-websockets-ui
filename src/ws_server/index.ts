import { Server as HttpServer } from "http";
import { WebSocketServer } from "ws";

export const createWsServer = (port: number) => {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (ws) => {
    console.log("WebSocket was connected.");

    ws.on("message", (message) => {
      console.log("Message: ", message.toString());
    });

    ws.on("close", () => {
      console.log("WebSocket was disconnected.");
    });
  });

  return wss;
};
