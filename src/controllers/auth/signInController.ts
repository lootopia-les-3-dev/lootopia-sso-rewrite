import type { Context } from "hono"
import { getUserByEmail } from "../../utils/users/getUserByEmail.js"
import { createVerificationToken } from "../../utils/tokens/createVerificationToken.js"
import { sendEmail } from "../../utils/send/sendEmail.js"

export const signInController = async (c: Context) => {
  const body = await c.req.parseBody()
  const email = body.email as string
  const callbackUrl = body.callback_url as string | undefined

  if (!email) {
    return c.json({ error: "Email is required" }, 400)
  }

  const user = await getUserByEmail(email)

  if (!user) {
    const params = new URLSearchParams({ email })
    if (callbackUrl) params.set("callback_url", callbackUrl)
    return c.redirect("/auth/signup?" + params.toString())
  }

  if (!user.verified) {
    const token = await createVerificationToken(user.id, callbackUrl)
    const verifyUrl = `${process.env.BASE_URL}/auth/verify?token=${token}`
    await sendEmail(
      email,
      "Vérification de votre compte Lootopia",
      `Cliquez sur ce lien pour vérifier votre compte : ${verifyUrl}`,
    )
    return c.redirect("/auth/verify")
  }

  const token = await createVerificationToken(user.id, callbackUrl)
  const verifyUrl = `${process.env.BASE_URL}/auth/verify?token=${token}`

  await sendEmail(
    email,
    "Connexion à Lootopia",
    `Cliquez sur ce lien pour vous connecter : ${verifyUrl}`,
  )

  return c.redirect("/auth/verify")
}
