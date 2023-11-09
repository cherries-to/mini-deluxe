interface FileOnlyOptions {
  enabled: boolean;
  directory: string;
}

interface ReqHandler {
  urlPath: string;
  handler?: CallableFunction;
  fomOptions?: FileOnlyOptions;
}

export type { ReqHandler, FileOnlyOptions };

export function returnNotFound() {
  return new Response("404 Not Found", {
    status: 404,
    headers: { "Content-Type": "text/html" },
  });
}

export interface RouteArguments {
  req: Request;
  url: URL;
  route: ReqHandler;
  params: URLSearchParams;
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

    let route: ReqHandler | null;
    try {
      route = handlers.find((r: ReqHandler) => {
        if (r.fomOptions !== undefined && r.fomOptions.enabled === true) {
          // console.log("fom found:", r);
          if (url.pathname.startsWith(r.urlPath))
            // if (r.path.exec(url.pathname) !== null && r.method === req.method)
            return r;
        } else {
          if (r.urlPath.endsWith(url.pathname))
            // if (r.path.exec(url.pathname) !== null && r.method === req.method)
            return r;
        }
      });
    } catch (e: any) {
      return new Response(e, { status: 500 });
    }

    // If there's no such route, show a 404
    if (!route) return fofHandler();

    const params = new URLSearchParams(url.search);

    // Run the route's handler
    if (route.handler !== undefined)
      return await route.handler({ req, url, route, params } as RouteArguments);
    else return fofHandler();
  }

  return requestHandler;
}

import { join } from "path";

export function fileOnlyReqHandler(
  prefix: string = "/public",
  staticFilePath: string = "public"
) {
  async function requestHandler(req: Request) {
    // Generate URL from request data
    const url = new URL(req.url);

    // Fall back to public directory
    let urlPath = url.pathname.substring(prefix.length);

    // default handlers built into the program
    if (urlPath === "") {
      // redirect to /
      return new Response("Redirect", {
        status: 301,
        statusText: "Moved",
        headers: { Location: prefix + "/" },
      });
    }
    if (urlPath.endsWith("/")) {
      urlPath = "/index.html";
    }

    // console.log(prefix, staticFilePath, urlPath);

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

/// Delete a cookie
export function deleteCookie(name: string, value: string) {
  return new Response("Cookie Edited", {
    headers: {
      "Set-Cookie": `${name}=${value}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    },
    status: 301,
    statusText: "Moved",
  });
}

/// Return any raw file you would like, headers will be filled out by Bun.file()
export function rawFile(path: string) {
  // return rawFile = Bun.file -> Response;
  return new Response(Bun.file(path));
}
