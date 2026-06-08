import { buildEmailHtml } from "../utils/send/emailTemplate.js"
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
    buildEmailHtml({
      title: "Connectez-vous à Lootopia",
      body: "Cliquez sur le bouton ci-dessous pour vous connecter à votre compte. Ce lien est valable quelques minutes.",
      buttonLabel: "Se connecter",
      buttonUrl: url,
      footerNote: "Si vous n'avez pas demandé cette connexion, ignorez cet email.",
    }),
  )
}

export const sendVerificationEmailMobileLink = async (email: string, token: string) => {
  const deepLink = `lootopia://auth/verify?token=${encodeURIComponent(token)}`
  const webLink = `${process.env.BASE_URL}/api/auth/verify?token=${encodeURIComponent(token)}`

  await sendEmail(
    email,
    "Connexion à Lootopia",
    buildEmailHtml({
      title: "Connectez-vous à Lootopia",
      body: "Appuyez sur le bouton ci-dessous pour vous connecter depuis votre iPhone.",
      buttonLabel: "Ouvrir l'application",
      buttonUrl: deepLink,
      footerNote: `Si vous n'avez pas demandé cette connexion, ignorez cet email.`,
    }),
  )
}

export const sendAccountDeletionEmail = async (email: string) => {
  await sendEmail(
    email,
    "Votre compte Lootopia a été supprimé",
    buildEmailHtml({
      title: "Votre compte a été supprimé",
      body: "Nous vous confirmons que votre compte Lootopia ainsi que l'ensemble de vos données personnelles ont bien été supprimés conformément à votre demande.",
      buttonVariant: "danger",
      footerNote: "Si vous n'êtes pas à l'origine de cette demande, contactez-nous immédiatement.",
    }),
  )
}
