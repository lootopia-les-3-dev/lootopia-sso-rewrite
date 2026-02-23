import "dotenv/config";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { API } from "./routes/api.js";
import { Front } from "./routes/front.js";
const app = new Hono();
app.use("/styles/*", serveStatic({ root: "./src" }));
app.use("/fonts/*", serveStatic({ root: "./public" }));
app.route("/api", API);
app.route("/", Front);
app.notFound((c) => c.redirect("/auth"));
serve({
    fetch: app.fetch,
    port: 3000,
}, () => {
    console.log(`Server is running on`, process.env.BASE_URL);
});
