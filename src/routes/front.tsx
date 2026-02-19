import { Hono } from "hono"
import AuthPage from "../pages/auth.js"

export const Front = new Hono()

Front.get("/auth/signin", (c) => {
  const email = c.req.query("email")
  const callbackUrl = c.req.query("callback_url")
  return c.html(<AuthPage mode="signin" email={email} callbackUrl={callbackUrl} />)
})

Front.get("/auth/signup", (c) => {
  const email = c.req.query("email")
  const callbackUrl = c.req.query("callback_url")
  return c.html(<AuthPage mode="signup" email={email} callbackUrl={callbackUrl} />)
})

Front.get("/auth/success", (c) => {
  return c.html(
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Lootopia - Connexion réussie</title>
        <link rel="stylesheet" href="/styles/globals.css" />
      </head>
      <body>
        <div class="card">
          <h1>Connexion réussie !</h1>
          <p>
            Votre compte a été vérifié avec succès. Vous pouvez maintenant
            fermer cette page.
          </p>
        </div>
      </body>
    </html>,
  )
})

