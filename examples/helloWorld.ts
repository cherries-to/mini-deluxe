import miniDeluxe from "../index";
const m = miniDeluxe.miniServer({
  port: 3000,
  handlers: [
    {
      urlPath: "/",
      handler: async function (req: Request) {
        return new Response("Hello, world!");
      },
    },
  ],
});