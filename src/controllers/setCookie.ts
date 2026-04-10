import type { Context } from "hono"
import { setSignedCookie } from "hono/cookie"
import { sign } from "hono/jwt"
import type { User } from "../types/user.js"

export const setCookieController = async (c: Context, user: User) => {
  const url = new URL(c.req.url)
  const globalDomain = url.host.split(".").slice(-2).join(".")

  const payload = {
    sub: String(user.id),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  }
  const token = await sign(payload, process.env.JWT_SECRET!, "HS256")
  
  await setSignedCookie(c, "auth_token", token, process.env.JWT_SECRET!, {
    httpOnly: true,
    secure: true,
    domain: `.${globalDomain}`,
    sameSite: "Lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export default setCookieController
