import type { Context } from "hono"
import { getSignedCookie } from "hono/cookie"
import { verify } from "hono/jwt"
import { updateUserProfile } from "../../utils/users/updateUserProfile.js"

export const completeController = async (c: Context) => {
  const token = await getSignedCookie(c, process.env.JWT_SECRET!, "auth_token")

  if (!token) {
    return c.redirect("/login")
  }

  let userId: number
  try {
    const payload = await verify(token, process.env.JWT_SECRET!, "HS256")
    userId = Number(payload.sub)
  } catch {
    return c.redirect("/login")
  }

  const body = await c.req.parseBody()
  const firstName = body.firstName as string
  const lastName = body.lastName as string
  const callbackUrl = body.callbackUrl as string

  if (!firstName || !lastName) {
    return c.json({ error: "First name and last name are required" }, 400)
  }

  await updateUserProfile(userId, { firstName, lastName })

  return c.redirect(callbackUrl)
}
