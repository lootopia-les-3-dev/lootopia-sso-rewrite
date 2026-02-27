import type { Context } from "hono"
import { getAuthUser } from "../../utils/auth/getAuthUser.js"
import { updateUserProfile } from "../../utils/users/updateUserProfile.js"

export const completeController = async (c: Context) => {
  const user = await getAuthUser(c)

  if (!user) {
    return c.redirect("/login")
  }

  const body = await c.req.parseBody()
  const firstName = body.firstName as string
  const lastName = body.lastName as string
  const callbackUrl = body.callbackUrl as string

  if (!firstName || !lastName) {
    return c.json({ error: "First name and last name are required" }, 400)
  }

  await updateUserProfile(user.id, { firstName, lastName })

  return c.redirect(callbackUrl)
}
