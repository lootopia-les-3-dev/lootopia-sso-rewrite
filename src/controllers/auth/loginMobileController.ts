import type { Context } from "hono"
import { sendVerificationEmailMobile } from "../../services/emailService.js"
import { createVerificationToken } from "../../services/authService.js"
import { findOrCreateUser } from "../../services/userService.js"

export const loginMobileController = async (c: Context) => {
  const body = await c.req.parseBody()
  const email = body["email"] as string
  const callbackUrl = body["callbackUrl"] as string

  if (!email) {
    return c.json({ error: "Email is required" }, 400)
  }

  const user = await findOrCreateUser(email)
  const { token, code } = await createVerificationToken(user.id)

  await sendVerificationEmailMobile(email, code)

  const params = new URLSearchParams({ token })
  if (callbackUrl) params.set("callbackUrl", callbackUrl)

  return c.redirect("/verify-code?" + params.toString())
}
