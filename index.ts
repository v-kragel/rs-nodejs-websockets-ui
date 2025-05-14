import { createHttpServer } from "./src/http_server/index.js";
import { createWsServer } from "./src/ws_server/index.js";

const HTTP_PORT = 8181;
const WSS_PORT = 3000;

const httpServer = createHttpServer();
const wss = createWsServer(WSS_PORT);

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});

function shutdown() {
  console.log("\nShutting down gracefully...");

  wss.close(() => {
    console.log("WebSocket server closed");
  });

  httpServer.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Force exiting...");
    process.exit(1);
  }, 5000).unref();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
