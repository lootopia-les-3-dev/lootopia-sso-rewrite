import type { Context } from "hono"
import { getCookie, getSignedCookie } from "hono/cookie"

export const tokenController = async (c: Context) => {
  const verified = await getSignedCookie(c, process.env.JWT_SECRET!, "auth_token")

  if (!verified) {
    return c.json({ error: "Unauthorized" }, 401)
  }

  // Return the raw cookie value (JWT.hmac) so the app can replay it as-is
  const raw = getCookie(c, "auth_token")
  return c.json({ token: raw })
}
