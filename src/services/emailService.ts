import { sendEmail } from "../utils/send/sendEmail.js"

export const sendVerificationEmail = async (email: string, token: string, callbackUrl: string) => {
  const params = new URLSearchParams({ token })

  if (callbackUrl) {
    params.set("callbackUrl", callbackUrl)
  }

  const url = `${process.env.BASE_URL}/api/auth/verify?${params.toString()}`

  await sendEmail(
    email,
    "Connexion à Lootopia",
    `Cliquez sur ce lien pour vous connecter : ${url}\n\nSi vous n'avez pas demandé cette connexion, ignorez cet email.`,
  )
}

export const sendVerificationEmailMobileLink = async (email: string, token: string) => {
  const url = `${process.env.BASE_URL}/api/auth/verify?token=${encodeURIComponent(token)}`

  await sendEmail(
    email,
    "Connexion à Lootopia",
    `Cliquez sur ce lien depuis votre iPhone pour vous connecter :\n${url}\n\nSi vous n'avez pas demandé cette connexion, ignorez cet email.`,
  )
}