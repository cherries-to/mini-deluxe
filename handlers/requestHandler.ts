import { BunFile } from "bun";
import path from "path";

/**
 * Typically used as a public folder handler
 * or fallback handler
 */
export async function requestHandler(url: URL): Promise<Response> {
  // Fall back to public directory
  let urlPath = url.pathname;

  if (urlPath.endsWith("/")) {
    urlPath = "/index.html";
  }

  try {
    // Read the path and make a response
    return new Response(Bun.file(path.join("./public/", urlPath)));
  } catch (e) {
    return new Response("Internal Server Error\n\n" + e, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
