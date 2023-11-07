import {
  RouteArguments,
  createCookie,
  editCookie,
  pageBuilder,
  rawFile,
} from "../handlers/handling";
import miniDeluxe from "../index";

const m = miniDeluxe.miniServer({
  port: 3000,
  // options: {
  //   fileOnlyMode: true
  // },
  handlers: [
    {
      urlPath: "/",
      handler: async function (data: RouteArguments) {
        return pageBuilder(
          "<h1>New Webs</h1><small><em>sponsored by cherries.to & tuck</em></small>"
        );
      },
    },
    {
      urlPath: "/test",
      handler: async function (data: RouteArguments) {
        return new Response(JSON.stringify(data.params), {
          headers: { "content-type": "application/json" },
        });
      },
    },
    {
      urlPath: "/turtle",
      handler: async function (data: RouteArguments) {
        return rawFile("../public/sample.png");
      },
    },
    {
      urlPath: "/cookie/make",
      handler: async function (data: RouteArguments) {
        return createCookie("cherries.to", "yes!");
      },
    },
    {
      urlPath: "/cookie/edit",
      handler: async function (data: RouteArguments) {
        return editCookie("cherries.to", "edited");
      },
    },
    {
      urlPath: "/error",
      handler: async function (data: RouteArguments) {
        throw new TypeError("Bad Error");
      },
    },
  ],
});
