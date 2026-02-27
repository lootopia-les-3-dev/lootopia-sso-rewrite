import React from "react"

type CompletePageProps = {
  callbackUrl?: string
}

const CompletePage = ({ callbackUrl }: CompletePageProps) => {
  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Lootopia - Compléter votre profil</title>
        <link rel="stylesheet" href="/styles/globals.css" />
      </head>
      <body>
        <div className="card">
          <h1>Compléter votre profil</h1>
          <form method="post" action="/api/auth/complete">
            {callbackUrl && (
              <input type="hidden" name="callbackUrl" value={callbackUrl} />
            )}
            <div className="form-group">
              <label htmlFor="firstName">Prénom</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Jean"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Nom</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Dupont"
                required
              />
            </div>
            <input type="submit" value="Continuer" />
          </form>
        </div>
      </body>
    </html>
  )
}

export default CompletePage
