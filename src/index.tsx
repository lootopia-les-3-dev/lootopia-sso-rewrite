import { serve } from "@hono/node-server";
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Hono } from "hono";
import { renderToString } from "react-dom/server";
import LoginPage from "./pages/login";

const db = drizzle(process.env.DATABASE_URL!);
const app = new Hono();

app.get("/auth/login", (c) => {
  const html = renderToString(<LoginPage />);
  return c.html(html);
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
