import type { Context } from "hono"
import { eq } from "drizzle-orm"
import db from "../../db/connection.js"
import { users, verificationTokens } from "../../db/schema.js"
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

  const userResult = await db.select().from(users).where(eq(users.id, record.userId))
  const user = userResult[0]

  if (user?.firstName && user?.lastName) {
    return c.redirect(record.callbackUrl ?? "/auth/success")
  }

  const params = new URLSearchParams()
  if (record.callbackUrl) params.set("callback_url", record.callbackUrl)
  return c.redirect("/auth/complete" + (params.size ? "?" + params.toString() : ""))
}
