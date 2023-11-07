# Mini-deluxe

Mini-web server for Bun.js.
This minimal server thing extends `Bun.serve()` and creates a simple wrapper with useful features such as a public directory, websocket support built-in, etc.

## Usage

This isn't exactly a library (yet) so you'll have to copy the files from `handlers` into your project.

Here are some server examples:

**Basic HTTP server**
```ts
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
```

**Basic websocket server**
```ts
import { requestHandler } from "./handlers/requestHandler";
import { ReqHandlerType, makeServer } from "./handlers/serverConstructor";

const server = makeServer({
  // Set up the server basics
  port: 3000,
  publicFolderPath: "./public",

  // Set up the request handler
  requestHandler,
  requestHandlerType: ReqHandlerType.UrlAndWs,

  // Instance of WebSocketHandler
  websocketConfig: {
    message(ws, message) {
      console.log(`${ws.data} said: ${message}`);
    },
    // . . . (open, close, ping, pong, etc.)
  },
  // Also see websocketHandler to set custom `ws.data`.
});

console.log(`Listening on localhost:${server.port}`);
```

## Setup

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
