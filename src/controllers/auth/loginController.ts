import type { Context } from "hono"
import { getUserByEmail } from "../../utils/users/getUserByEmail.js"
import { createUser } from "../../utils/users/createUser.js"
import { createVerificationToken } from "../../utils/tokens/createVerificationToken.js"
import { sendEmail } from "../../utils/send/sendEmail.js"

export const loginController = async (c: Context) => {
  const body = await c.req.parseBody()
  const email = body.email as string
  const callbackUrl = body.callback_url as string | undefined

  if (!email) {
    return c.json({ error: "Email is required" }, 400)
  }

  let user = await getUserByEmail(email)

  if (!user) {
    user = await createUser(email)
  }

  const token = await createVerificationToken(user.id, callbackUrl)
  const verifyUrl = `${process.env.BASE_URL}/api/auth/verify?token=${token}`

  await sendEmail(
    email,
    "Connexion à Lootopia",
    `Cliquez sur ce lien pour vous connecter : ${verifyUrl}`,
  )

  return c.redirect("/verify")
}
