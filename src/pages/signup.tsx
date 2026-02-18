import { SignUpForm } from "../components/forms/SignUpForm.js"

const SignUpPage = ({ email }: { email?: string }) => {
  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Lootopia - Inscription</title>
        <link rel="stylesheet" href="/styles/globals.css" />
      </head>
      <body>
        <div class="card">
          <h1>Inscription à votre compte</h1>
          <SignUpForm email={email} />
        </div>
      </body>
    </html>
  )
}

export default SignUpPage
