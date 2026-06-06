import type { Context } from "hono"
import { sendVerificationEmailMobileLink } from "../../services/emailService.js"
import { createVerificationToken } from "../../services/authService.js"
import { findOrCreateUser } from "../../services/userService.js"

export const loginMobileController = async (c: Context) => {
  const body = await c.req.parseBody()
  const email = body["email"] as string

  if (!email) {
    return c.json({ error: "Email is required" }, 400)
  }

  const user = await findOrCreateUser(email)
  const { token } = await createVerificationToken(user.id)

  await sendVerificationEmailMobileLink(email, token)

  return c.json({ ok: true })
}
