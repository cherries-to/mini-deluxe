import { BunFile } from "bun";
import path from "path";

export interface ReqHandler {
  urlPath: string;
  handler: CallableFunction;
}

export function returnNotFound() {
  return new Response("404 Not Found", {
    status: 404,
    headers: { "Content-Type": "text/html" },
  });
}

export interface Route {
  /**
   * The path of the route, e.g. `/` or `/chat`.
   */
  urlPath: string;
  handler: CallableFunction;
}

export function fileOnlyHandlers(url: URL) {
  return new Response(Bun.file(url.pathname));
}

export function generateRequestHandler(
  handlers: any[],
  fofHandler: Function = returnNotFound
) {
  async function requestHandler(req: Request): Promise<Response> {
    // Generate URL from request data
    const url = new URL(req.url);

    // Fall back to public directory
    let urlPath = url.pathname;

    // default handlers built into the program
    if (urlPath.endsWith("/")) {
      urlPath = "/index.html";
    }

    let route: Route | null;
    try {
      route = handlers.find((r: Route) => {
        if (r.urlPath.endsWith(url.pathname))
          // if (r.path.exec(url.pathname) !== null && r.method === req.method)
          return r;
      });
    } catch (e: any) {
      return new Response(e, { status: 500 });
    }

    // If there's no such route, show a 404
    if (!route) return fofHandler();

    // Run the route's handler
    return await route?.handler({ req, url, route });
  }

  return requestHandler;
}

import { join } from "path";

export function fileOnlyReqHandler(staticFilePath: string = "public") {
  async function requestHandler(req: Request) {
    // Generate URL from request data
    const url = new URL(req.url);

    // Fall back to public directory
    let urlPath = url.pathname;

    // default handlers built into the program
    if (urlPath.endsWith("/")) {
      urlPath = "/index.html";
    }

    return new Response(Bun.file(join(staticFilePath, urlPath)));
  }

  return requestHandler;
}

/**
 * Build a page and return with content type. Meant for simple API serverside uses like sqlite3 just to return extra comments.
 */
export function pageBuilder(html: string, contentType: string = "text/html") {
  return new Response(html, {
    headers: { "content-type": contentType },
  });
}

/// Create a cookie by ${name} and ${value}
export function createCookie(name: string, value: string) {
  return new Response("Cookie Created", {
    headers: { "Set-Cookie": `${name}=${value}` },
  });
}

/// Edit an already existing cookie by ${name} and ${value}
export function editCookie(name: string, value: string) {
  return new Response("Cookie Edited", {
    headers: { Cookie: `${name}=${value}` },
    status: 301,
    statusText: "Moved",
  });
}

/// Return any raw file you would like, headers will be filled out by Bun.file()
export function rawFile(path: string) {
  // return rawFile = Bun.file -> Response;
  return new Response(Bun.file(path));
}
