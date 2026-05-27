import React from "react"
import { LoginForm } from "../components/forms/LoginForm.js"

const LoginMobilePage = ({ callbackUrl }: { callbackUrl: string }) => {
  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Lootopia - Connexion</title>
        <link rel="stylesheet" href="/styles/globals.css" />
      </head>
      <body>
        <div className="card">
          <h1>Connexion à Lootopia</h1>
          <LoginForm callbackUrl={callbackUrl} action="/api/auth/login-mobile" />
        </div>
      </body>
    </html>
  )
}

export default LoginMobilePage
