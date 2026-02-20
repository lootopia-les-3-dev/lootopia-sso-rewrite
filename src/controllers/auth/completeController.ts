import type { Context } from "hono"
import { getCookie } from "hono/cookie"
import { verify } from "hono/jwt"
import { updateUserProfile } from "../../utils/users/updateUserProfile.js"

export const completeController = async (c: Context) => {
  const rawToken = getCookie(c, "auth_token")

  if (!rawToken) {
    return c.redirect("/auth/signin")
  }

  let userId: number
  try {
    const payload = await verify(rawToken, process.env.JWT_SECRET!, "HS256")
    userId = Number(payload.sub)
  } catch {
    return c.redirect("/auth/signin")
  }

  const body = await c.req.parseBody()
  const firstName = body.firstName as string
  const lastName = body.lastName as string
  const callbackUrl = body.callback_url as string | undefined

  if (!firstName || !lastName) {
    return c.json({ error: "First name and last name are required" }, 400)
  }

  await updateUserProfile(userId, { firstName, lastName })

  return c.redirect(callbackUrl ?? "/auth/success")
}
