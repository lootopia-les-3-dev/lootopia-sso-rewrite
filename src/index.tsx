import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Hono } from "hono";
import LoginPage from "./pages/login.js";

const db = drizzle(process.env.DATABASE_URL!);
const app = new Hono();

app.use("/styles/*", serveStatic({ root: "./src" }));

app.get("/auth/login", (c) => {
  return c.html(<LoginPage />);
});

app.post("/api/auth/login", async (c) => {
  const { email } = await c.req.json();

  return c.json({ email });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
