import { AuthForm } from "../components/forms/AuthForm.js"

type AuthPageProps = {
  mode: "signin" | "signup"
  email?: string
  callbackUrl?: string
}

const titles = {
  signin: "Connexion à votre compte",
  signup: "Inscription à votre compte",
}

const AuthPage = ({ mode, email, callbackUrl }: AuthPageProps) => {
  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Lootopia - {mode === "signin" ? "Connexion" : "Inscription"}</title>
        <link rel="stylesheet" href="/styles/globals.css" />
      </head>
      <body>
        <div class="card">
          <h1>{titles[mode]}</h1>
          <AuthForm mode={mode} email={email} callbackUrl={callbackUrl} />
        </div>
      </body>
    </html>
  )
}

export default AuthPage
