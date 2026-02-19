import type { Context } from "hono"
import { getUserByEmail } from "../../utils/users/getUserByEmail.js"
import { createUser } from "../../utils/users/createUser.js"
import { createVerificationToken } from "../../utils/tokens/createVerificationToken.js"
import { sendEmail } from "../../utils/send/sendEmail.js"

export const signUpController = async (c: Context) => {
  const body = await c.req.parseBody()
  const firstName = body.firstName as string
  const lastName = body.lastName as string
  const email = body.email as string
  const callbackUrl = body.callback_url as string | undefined

  if (!firstName || !lastName || !email) {
    return c.json({ error: "All fields are required" }, 400)
  }

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    const params = new URLSearchParams({ email })
    if (callbackUrl) params.set("callback_url", callbackUrl)
    return c.redirect("/auth/signin?" + params.toString())
  }

  const newUser = await createUser(firstName, lastName, email)

  const token = await createVerificationToken(newUser.id, callbackUrl)
  const verifyUrl = `${process.env.BASE_URL}/auth/verify?token=${token}`

  await sendEmail(
    email,
    "Vérification de votre compte Lootopia",
    `Cliquez sur ce lien pour vérifier votre compte : ${verifyUrl}`,
  )

  return c.redirect("/auth/verify")
}
