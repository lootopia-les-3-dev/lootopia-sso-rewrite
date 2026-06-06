import type { Context } from "hono"
import { verifyAppleMobileToken } from "../../services/appleService.js"
import { findOrCreateUser } from "../../services/userService.js"
import { setCookieController } from "../setCookie.js"

// POST /api/auth/apple/mobile
// Body (JSON): { identityToken: string, firstName?: string, lastName?: string }
export const appleMobileController = async (c: Context) => {
  const body = await c.req.json<{
    identityToken: string
    firstName?: string
    lastName?: string
  }>()

  if (!body.identityToken) {
    return c.json({ error: "identityToken is required" }, 400)
  }

  const payload = await verifyAppleMobileToken(body.identityToken)

  if (!payload.email) {
    return c.json({ error: "Apple did not return an email" }, 400)
  }

  const user = await findOrCreateUser(payload.email)
  const token = await setCookieController(c, user)

  return c.json({
    token,
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profileComplete: !!(user.firstName && user.lastName),
  })
}
