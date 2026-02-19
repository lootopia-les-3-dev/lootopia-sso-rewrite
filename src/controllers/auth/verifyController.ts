import type { Context } from "hono"
import { eq } from "drizzle-orm"
import db from "../../db/connection.js"
import { verificationTokens } from "../../db/schema.js"
import { getVerificationToken } from "../../utils/tokens/getVerificationToken.js"
import { verifyUser } from "../../utils/users/verifyUser.js"
import { setAuthCookie } from "../setCookie.js"

export const verifyController = async (c: Context) => {
  const token = c.req.query("token")

  if (!token) {
    return c.json({ error: "Token is required" }, 400)
  }

  const record = await getVerificationToken(token)

  if (!record) {
    return c.json({ error: "Invalid token" }, 400)
  }

  if (new Date() > record.expiresAt) {
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.id, record.id))
    return c.json({ error: "Token expired" }, 400)
  }

  await verifyUser(record.userId)
  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.id, record.id))
  await setAuthCookie(c, record.userId)

  const destination = record.callbackUrl ?? "/auth/success"
  return c.redirect(destination)
}
