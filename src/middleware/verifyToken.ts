import type { Context, Next } from "hono"
import { deleteVerificationToken } from "../utils/tokens/deleteVerificationToken.js"
import { getVerificationToken } from "../utils/tokens/getVerificationToken.js"

export const verifyTokenMiddleware = async (c: Context, next: Next) => {
  const { token } = c.req.query()

  if (!token) {
    return c.json({ error: "Token is required" }, 400)
  }

  const record = await getVerificationToken(token)

  if (!record) {
    return c.json({ error: "Invalid token" }, 400)
  }

  if (new Date() > record.expiresAt) {
    await deleteVerificationToken(record.id)
    return c.json({ error: "Token expired" }, 400)
  }

  c.set("verificationRecord", record)

  await next()
}
