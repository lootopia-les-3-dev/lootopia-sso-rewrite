import { LoginForm } from "../components/forms/LoginForm.js"

const LoginPage = ({ callbackUrl }: { callbackUrl: string }) => {
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
          <LoginForm callbackUrl={callbackUrl} />
        </div>
      </body>
    </html>
  )
}

export default LoginPage
