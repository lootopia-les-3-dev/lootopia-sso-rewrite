import type { Context } from "hono"
import { getUserByEmail } from "../../utils/users/getUserByEmail.js"
import { createUser } from "../../utils/users/createUser.js"
import { createVerificationToken } from "../../utils/tokens/createVerificationToken.js"
import { sendEmail } from "../../utils/send/sendEmail.js"

export const signUpController = async (c: Context) => {
  const body = await c.req.parseBody()
  const email = body.email as string
  const callbackUrl = body.callback_url as string | undefined

  if (!email) {
    return c.json({ error: "Email is required" }, 400)
  }

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    await sendEmail(
      email,
      "Tentative de création de compte Lootopia",
      `Un compte existe déjà avec cette adresse. Si vous souhaitez vous connecter, rendez-vous sur ${process.env.BASE_URL}/auth/signin.`,
    )
    return c.redirect("/auth/verify")
  }

  const newUser = await createUser(email)

  const token = await createVerificationToken(newUser.id, callbackUrl)
  const verifyUrl = `${process.env.BASE_URL}/api/auth/verify?token=${token}`

  await sendEmail(
    email,
    "Vérification de votre compte Lootopia",
    `Cliquez sur ce lien pour vérifier votre compte : ${verifyUrl}`,
  )

  return c.redirect("/auth/verify")
}
