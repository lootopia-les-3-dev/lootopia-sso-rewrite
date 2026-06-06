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
  const deepLink = `lootopia://auth/verify?token=${encodeURIComponent(token)}`
  const webLink = `${process.env.BASE_URL}/api/auth/verify?token=${encodeURIComponent(token)}`

  await sendEmail(
    email,
    "Connexion à Lootopia",
    `Connectez-vous à Lootopia :\n\n${deepLink}\n\nSi le lien ne fonctionne pas, ouvrez ce lien depuis votre iPhone :\n${webLink}\n\nSi vous n'avez pas demandé cette connexion, ignorez cet email.`,
  )
}