import React from "react"

const VerifyPage = () => {
  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Lootopia - Vérification de votre email</title>
        <link rel="stylesheet" href="/styles/globals.css" />
      </head>
      <body>
        <div className="card">
          <h1>Vérifiez votre email</h1>
          <p>
            Un lien de connexion vous a été envoyé. Veuillez cliquer sur le lien
            dans cet email pour continuer.
          </p>
        </div>
      </body>
    </html>
  )
}

export default VerifyPage
