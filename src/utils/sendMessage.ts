import { WebSocket } from "ws";

export function sendMessage(ws: WebSocket, message: string): void {
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(message);
  }
}
