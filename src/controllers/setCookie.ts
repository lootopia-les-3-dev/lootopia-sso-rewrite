import type { Context } from "hono"
import { sign } from "hono/jwt"
import { setCookie } from "hono/cookie"

export const setCookieController = async (c: Context, userId: number, email: string) => {
  const payload = {
    sub: String(userId),
    email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  }
  const token = await sign(payload, process.env.JWT_SECRET!, "HS256")
  setCookie(c, "auth_token", token, {
    httpOnly: true,
    secure: true,
    domain: ".lootopia.io",
    sameSite: "Lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export default setCookieController
