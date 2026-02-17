import { SignInForm } from "../components/forms/SignInForm.js";

const SignInPage = ({ isFirstTime = false, email }: { isFirstTime?: boolean; email?: string }) => {
  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Lootopia - Connexion</title>
        <link rel="stylesheet" href="/styles/globals.css" />
      </head>
      <body>
        <div>
          <h1>Sign in</h1>
          <SignInForm isFirstTime={isFirstTime} email={email} />
        </div>
      </body>
    </html>
  );
};

export default SignInPage;
