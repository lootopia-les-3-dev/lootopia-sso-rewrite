import type { Context } from "hono"
import { getVerificationTokenByCode } from "../../utils/tokens/getVerificationTokenByCode.js"
import { deleteVerificationToken } from "../../utils/tokens/deleteVerificationToken.js"
import { getUserById } from "../../utils/users/getUserById.js"
import { verifyUser } from "../../utils/users/verifyUser.js"
import { setCookieController } from "../setCookie.js"

export const verifyCodeController = async (c: Context) => {
  const body = await c.req.parseBody()
  const token = body["token"] as string
  const code = body["code"] as string
  const callbackUrl = body["callbackUrl"] as string

  if (!token || !code) {
    return c.json({ error: "Token and code are required" }, 400)
  }

  const record = await getVerificationTokenByCode(token, code)

  if (!record) {
    return c.json({ error: "Invalid token or code" }, 400)
  }

  if (new Date() > record.expiresAt) {
    await deleteVerificationToken(record.id)
    return c.json({ error: "Code expired" }, 400)
  }

  await verifyUser(record.userId)
  await deleteVerificationToken(record.id)

  const user = await getUserById(record.userId)

  if (!user) {
    return c.json({ error: "User not found" }, 400)
  }

  const jwtToken = await setCookieController(c, user)

  if (c.req.header("Accept")?.includes("application/json")) {
    return c.json({
      token: jwtToken,
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
