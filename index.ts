import { requestHandler } from "./handlers/requestHandler";
import { ReqHandlerType, makeServer } from "./handlers/serverConstructor";

const server = makeServer({
  // Set up the server basics
  port: 3000,
  publicFolderPath: "./public",

  // Set up the request handler
  requestHandler,
  requestHandlerType: ReqHandlerType.UrlOnly
});

console.log(`Listening on localhost:${server.port}`);
