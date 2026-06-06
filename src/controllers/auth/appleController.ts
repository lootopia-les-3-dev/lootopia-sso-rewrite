import type { Context } from "hono"
import { getAppleAuthUrl, verifyAppleWebToken } from "../../services/appleService.js"
import { findOrCreateUser } from "../../services/userService.js"
import { setCookieController } from "../setCookie.js"

// GET /api/auth/apple — redirect to Apple OAuth
export const appleRedirectController = (c: Context) => {
  const url = getAppleAuthUrl()
  return c.redirect(url)
}

// POST /api/auth/apple/callback — Apple posts here after user consents
export const appleCallbackController = async (c: Context) => {
  const body = await c.req.parseBody()
  const code = body["code"] as string
  const callbackUrl = (c.req.query("callbackUrl") ?? body["state"] ?? "") as string

  if (!code) {
    return c.json({ error: "Missing code" }, 400)
  }

  const payload = await verifyAppleWebToken(code)

  if (!payload.email) {
    return c.json({ error: "Apple did not return an email" }, 400)
  }

  const user = await findOrCreateUser(payload.email)
  await setCookieController(c, user)

  if (user.firstName && user.lastName) {
    return c.redirect(callbackUrl || "/")
  }

  const params = new URLSearchParams()
  if (callbackUrl) params.set("callbackUrl", callbackUrl)
  return c.redirect("/complete" + (params.size ? "?" + params.toString() : ""))
}
