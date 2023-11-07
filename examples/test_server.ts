import {
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
      handler: async function (req: Request) {
        return pageBuilder(
          "<h1>New Webs</h1><small><em>sponsored by cherries.to & tuck</em></small>"
        );
      },
    },
    {
      urlPath: "/turtle",
      handler: async function (req: Request) {
        return rawFile("../public/sample.png");
      },
    },
    {
      urlPath: "/cookie/make",
      handler: async function (req: Request) {
        return createCookie("cherries.to", "yes!");
      },
    },
    {
      urlPath: "/cookie/edit",
      handler: async function (req: Request) {
        return editCookie("cherries.to", "edited");
      },
    },
    {
      urlPath: "/error",
      handler: async function (req: Request) {
        throw new TypeError("Bad Error");
      },
    },
  ],
});
