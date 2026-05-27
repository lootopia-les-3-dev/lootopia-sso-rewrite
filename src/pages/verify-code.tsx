import React from "react"
import { CodeForm } from "../components/forms/CodeForm.js"

const VerifyCodePage = ({ token, callbackUrl }: { token: string; callbackUrl: string }) => {
  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Lootopia - Vérification</title>
        <link rel="stylesheet" href="/styles/globals.css" />
      </head>
      <body>
        <div className="card">
          <h1>Entrez votre code</h1>
          <p>Un code à 6 chiffres vous a été envoyé par email.</p>
          <CodeForm token={token} callbackUrl={callbackUrl} />
        </div>
      </body>
    </html>
  )
}

export default VerifyCodePage
