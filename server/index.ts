import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";

const app = new Elysia()
  .use(
    await staticPlugin({
      prefix: "/",
      assets: "web/routes",
    }),
  )
  .listen(3000);

console.log(`Listening on ${app.server!.url}`);
