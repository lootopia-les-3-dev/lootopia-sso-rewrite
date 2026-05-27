import type { Context } from "hono"
import { deleteCookie } from "hono/cookie"

export const logoutController = async (c: Context) => {
  const url = new URL(c.req.url)
  const globalDomain = url.host.split(".").slice(-2).join(".")

  deleteCookie(c, "auth_token", {
    httpOnly: true,
    secure: true,
    domain: `.${globalDomain}`,
    sameSite: "Lax",
    path: "/",
  })

  return c.json({ success: true })
}
