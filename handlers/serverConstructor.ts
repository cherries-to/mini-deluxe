import { Server, WebSocketHandler } from "bun";

export enum ServerType {
  HttpOnly,
  SupportWs,
}
export enum ReqHandlerType {
  Auto,
  UrlOnly,
  UrlAndWs,
  Custom,
}

export interface IServerConfig {
  port?: number;
  publicFolderPath: string;
  requestHandler: Function;
  requestHandlerType?: ReqHandlerType;
  websocketConfig?: WebSocketHandler<unknown>;
  websocketHandler?: Function;
}

export function makeServer(config: IServerConfig, type?: ServerType): Server {
  if (config.requestHandlerType === undefined)
    config.requestHandlerType = ReqHandlerType.Auto;

  // fetchfunction can't inherit Function lol
  let fetchFunction: any;

  console.log("[debug]", "fetchFunction");

  if (
    config.requestHandlerType === undefined ||
    config.requestHandlerType === ReqHandlerType.UrlOnly
  ) {
    fetchFunction = async function fetch(req: Request) {
      return await config.requestHandler(new URL(req.url));
    };
    console.log("[debug]", "fetchFunction for default handler");
  } else if (config.requestHandlerType === ReqHandlerType.Custom) {
    fetchFunction = async function fetch(req: Request, server: Server) {
      return await config.requestHandler(req, server);
    };
    console.log("[debug]", "fetchFunction for custom handler");
  } else if (
    type === ServerType.SupportWs ||
    config.requestHandlerType === ReqHandlerType.UrlAndWs
  ) {
    fetchFunction = async function fetch(req: Request, server: Server) {
      // determine if this is a websocket or http connection

      if (
        req.headers.get("Connection") &&
        req.headers.get("Connection")?.includes("Upgrade") &&
        req.headers.get("Upgrade") !== null &&
        req.headers.get("Upgrade") === "websocket"
      ) {
        // Assume this is a WebSocket since we have verified the headers
        if (config.websocketHandler === undefined) {
          server.upgrade(req, {
            // Example data passed to the websocket handler.
            data: performance.now(),
          });
        } else await config.websocketHandler(server, req);
      } else {
        // Fallback to request handler
        return await config.requestHandler(new URL(req.url));
      }
    };
    console.log("[debug]", "fetchFunction for ws handler");
  }

  if (
    type === ServerType.SupportWs ||
    config.requestHandlerType === ReqHandlerType.UrlAndWs
  ) {
    console.log("[debug]", "fetchFunction set on ws...");
    return Bun.serve({
      fetch: fetchFunction,
      websocket: config.websocketConfig,
    });
  } else {
    // Assume httponly
    console.log("[debug]", "fetchFunction set on httponly...");
    return Bun.serve({
      port: 3000,
      fetch: fetchFunction,
    });
  }
}
