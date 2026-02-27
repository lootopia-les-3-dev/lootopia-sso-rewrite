import type { Context } from "hono"
import { sendVerificationEmail } from "../../services/emailService.js"
import { findOrCreateUser } from "../../services/userService.js"
import { createVerificationToken } from "../../services/authService.js"

export const loginController = async (c: Context) => {
  const body = await c.req.parseBody()
  const email = body["email"] as string
  const callbackUrl = body["callbackUrl"] as string

  if (!email) {
    return c.json({ error: "Email is required" }, 400)
  }

  const user = await findOrCreateUser(email)
  const token = await createVerificationToken(user.id)

  await sendVerificationEmail(email, token, callbackUrl)

  return c.redirect("/verify")
}
