import {
  createCookie,
  editCookie,
  pageBuilder,
  rawFile,
} from "../handlers/handling";
import miniDeluxe from "../index";

function fofHandler() {
  return new Response(
    `<!DOCTYPE html><html><head><style>html,body{background-color:#1a1a1a;color:#ffffff;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;padding: 20px;}</style></head><body><h1>404 Not Found</h1><p>The file you were looking for does not exist.</p></body></html>`,
    {
      status: 404,
      headers: {
        "Content-Type": "text/html",
      },
      statusText: "Not Found",
    }
  );
}

const m = miniDeluxe.miniServer({
  port: 3000,
  fofHandler,
  options: {
    fileOnlyMode: true,
    staticFilePath: "../public",
  },
});
