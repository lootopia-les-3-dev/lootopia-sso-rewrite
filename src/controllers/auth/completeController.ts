import type { Context } from "hono"
import { getAuthUser } from "../../utils/auth/getAuthUser.js"
import { getUserById } from "../../utils/users/getUserById.js"
import { updateUserProfile } from "../../utils/users/updateUserProfile.js"
import { setCookieController } from "../setCookie.js"
import { buildCallbackRedirect } from "../../utils/auth/buildCallbackRedirect.js"

export const completeController = async (c: Context) => {
  const user = await getAuthUser(c)

  if (!user) {
    return c.redirect("/login")
  }

  const body = await c.req.parseBody()
  const firstName = body["firstName"] as string
  const lastName = body["lastName"] as string
  const callbackUrl = body["callbackUrl"] as string

  if (!firstName || !lastName) {
    return c.json({ error: "First name and last name are required" }, 400)
  }

  await updateUserProfile(user.id, { firstName, lastName })

  const updated = (await getUserById(user.id)) ?? user
  const jwt = await setCookieController(c, updated)

  return c.redirect(buildCallbackRedirect(callbackUrl, jwt))
}
