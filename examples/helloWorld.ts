import { RouteArguments } from "../handlers/handling";
import miniDeluxe from "../index";
const m = miniDeluxe.miniServer({
  port: 3000,
  handlers: [
    {
      urlPath: "/",
      handler: async function (data: RouteArguments) {
        return new Response("Hello, world!");
      },
    },
  ],
});