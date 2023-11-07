import { Server, WebSocketHandler } from "bun";
import {
  ReqHandler,
  fileOnlyReqHandler,
  generateRequestHandler,
  returnNotFound,
} from "./handling";

interface MiniDxServerOptions {
  enableWs?: boolean;
  fileOnlyMode?: boolean;
  staticFilePath?: string;
}

interface MiniDxServerConfig {
  port?: number;
  options?: MiniDxServerOptions;
  handlers?: ReqHandler[];
  fofHandler?: Function;
  errorHandler?: any;
}

export function miniServer(config: MiniDxServerConfig): Server {
  // Assign default port
  if (!config.port) config.port = 3000;

  if (!config.fofHandler) config.fofHandler = returnNotFound;
  // Assign default error handler
  if (!config.errorHandler)
    config.errorHandler = function (error: Error) {
      console.log(error);
      if (error.name === "ENOENT") {
        //@ts-ignore ts stuff :)
        return config.fofHandler();
      }

      return new Response(
        `<!DOCTYPE html><html><head><style>html,body{background-color:#1a1a1a;color:#ffffff;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;padding: 20px;}</style></head><body><h1>${
          error.name
        } ${error.cause !== undefined ? `(${error.cause})` : ""}</h1><p>${
          error.message
        }</p><pre>${error.stack
          ?.replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")}</pre></body></html>`,
        {
          status: 500,
          headers: {
            "Content-Type": "text/html",
          },
          statusText: "Internal Server Error",
        }
      );
    };
  if (!config.options)
    config.options = {
      enableWs: false,
      fileOnlyMode: false,
      staticFilePath: "public",
    };

  if (config.handlers === undefined && config.options.fileOnlyMode !== true) {
    /**
     * This text shows up somewhere
     */
    throw new Error("No handlers assigned to your server");
  }
  if (!config.handlers) config.handlers = [];

  // Generate request handler
  const fetchHandler =
    config.options.fileOnlyMode == false
      ? generateRequestHandler(config.handlers, config.fofHandler)
      : fileOnlyReqHandler(config.options.staticFilePath);

  // Return final server
  return Bun.serve({
    port: config.port,
    fetch: fetchHandler,
    error: config.errorHandler,
  });
}
