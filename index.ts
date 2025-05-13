import { createHttpServer } from "./src/http_server/index.js";
import { createWsServer } from "./src/ws_server/index.js";

const HTTP_PORT = 8181;
const WSS_PORT = 3000;

const httpServer = createHttpServer();
createWsServer(WSS_PORT);

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});
