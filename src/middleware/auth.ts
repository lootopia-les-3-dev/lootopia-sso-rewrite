import type { Context, Next } from "hono"
import { getSignedCookie } from "hono/cookie"
import { verify } from "hono/jwt"
import { getUserById } from "../utils/users/getUserById.js"

export const authMiddleware = async (c: Context, next: Next) => {
  const secret = process.env.JWT_SECRET!

  const cookie = await getSignedCookie(c, secret, "auth_token")
  if (!cookie) {
    return c.json({ error: "Unauthorized" }, 401)
  }

  const payload = await verify(cookie, secret, "HS256")

  const userId = Number(payload.sub)
  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401)
  }

  const user = await getUserById(userId)

  if (user) {
    c.set("user", user)
  }

  await next()
}
