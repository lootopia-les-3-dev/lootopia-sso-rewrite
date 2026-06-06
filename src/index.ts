import { serve } from "@hono/node-server"
import { serveStatic } from "@hono/node-server/serve-static"
import "dotenv/config"
import { Hono } from "hono"
import { requestLogger } from "./middleware/requestLogger.js"
import { API } from "./routes/api.js"
import { Front } from "./routes/front.js"

const app = new Hono()

app.use("*", requestLogger) 

app.use("/styles/*", serveStatic({ root: "./src" }))
app.use("/fonts/*", serveStatic({ root: "./public" }))

// Apple Universal Links — AASA must be served without extension and with correct Content-Type
app.get("/.well-known/apple-app-site-association", (c) => {
  return c.json({
    applinks: {
      apps: [],
      details: [
        {
          appID: `${process.env.APPLE_TEAM_ID}.io.les3dev.lootopia`,
          paths: ["/api/auth/verify", "/api/auth/apple/callback"],
        },
      ],
    },
  })
})

app.route("/api", API)
app.route("/", Front)

app.notFound((c) => c.redirect("/login"))

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3000,
  },
  () => {
    console.log(`Server is running on`, process.env.BASE_URL)
  },
)
