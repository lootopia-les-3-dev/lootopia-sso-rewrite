import "dotenv/config"
import { serve } from "@hono/node-server"
import { serveStatic } from "@hono/node-server/serve-static"
import { Hono } from "hono"
import { API } from "./routes/api.js"
import { Front } from "./routes/front.js"

const app = new Hono()

// Serve static assets (CSS, etc.) from src/
app.use("/styles/*", serveStatic({ root: "./src" }))

app.route("/api", API)
app.route("/", Front)

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  },
)
