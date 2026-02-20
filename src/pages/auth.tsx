import { AuthForm } from "../components/forms/AuthForm.js"

type AuthPageProps = {
  email?: string
  callbackUrl?: string
}

const AuthPage = ({ email, callbackUrl }: AuthPageProps) => {
  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Lootopia - Connexion</title>
        <link rel="stylesheet" href="/styles/globals.css" />
      </head>
      <body>
        <div class="card">
          <h1>Connexion à Lootopia</h1>
          <AuthForm email={email} callbackUrl={callbackUrl} />
        </div>
      </body>
    </html>
  )
}

export default AuthPage
