import type { Context } from "hono"
import { getSignedCookie } from "hono/cookie"
import { eq } from "drizzle-orm"
import db from "../../db/connection.js"
import { users } from "../../db/schema.js"

export const completeController = async (c: Context) => {
  const userId = await getSignedCookie(c, process.env.JWT_SECRET!, "auth_token")

  if (!userId) {
    return c.redirect("/auth/signin")
  }

  const body = await c.req.parseBody()
  const firstName = body.firstName as string
  const lastName = body.lastName as string
  const callbackUrl = body.callback_url as string | undefined

  if (!firstName || !lastName) {
    return c.json({ error: "First name and last name are required" }, 400)
  }

  await db
    .update(users)
    .set({ firstName, lastName })
    .where(eq(users.id, Number(userId)))

  return c.redirect(callbackUrl ?? "/auth/success")
}
