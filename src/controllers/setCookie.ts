import type { Context } from "hono"
import { setSignedCookie } from "hono/cookie"

const setCookieController = async (c: Context) => {
  const body = await c.req.parseBody()
  const email = body.email as string

  if (!email) {
    return c.json({ success: false, error: "Email is required." }, 400)
  }

  await setSignedCookie(c, "auth_token", email, process.env.JWT_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    domain: process.env.NODE_ENV === "production" ? ".lootopia.io" : undefined,
    sameSite: "Lax",
    maxAge: 60 * 60 * 24 * 7,
  })

  return c.json({ message: `Cookie set for email: ${email}` })
}

export default setCookieController
