import type { Context } from "hono"
import { getCookie } from "hono/cookie"
import { deleteVerificationToken } from "../../utils/tokens/deleteVerificationToken.js"
import { getUserById } from "../../utils/users/getUserById.js"
import { verifyUser } from "../../utils/users/verifyUser.js"
import { setCookieController } from "../setCookie.js"

export const verifyController = async (c: Context) => {
  const { callbackUrl } = c.req.query()
  const record = c.get("verificationRecord")

  await verifyUser(record.userId)
  await deleteVerificationToken(record.id)

  const user = await getUserById(record.userId)

  if (!user) {
    return c.json({ error: "User not found" }, 400)
  }

  await setCookieController(c, user)

  if (c.req.header("Accept")?.includes("application/json")) {
    const raw = getCookie(c, "auth_token")
    return c.json({
      token: raw,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileComplete: !!(user.firstName && user.lastName),
      },
    })
  }

  if (user.firstName && user.lastName) {
    return c.redirect(callbackUrl)
  }

  const params = new URLSearchParams()
  if (callbackUrl) params.set("callbackUrl", callbackUrl)
  return c.redirect("/complete" + (params.size ? "?" + params.toString() : ""))
}
