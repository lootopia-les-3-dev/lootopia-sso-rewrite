import type { Context } from "hono";
import { setCookie } from "hono/cookie";

const setCookieController = async (c: Context) => {
  setCookie(c, "testCookie", "cookieValue", {});
  
  return c.json({ message: "Cookie has been set" });
}

export default setCookieController;