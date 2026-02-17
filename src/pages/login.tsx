import { LoginForm } from "../components/forms/LoginForm.js";

const LoginPage = () => {
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
          <h1>Login Page</h1>
          <LoginForm />
        </div>
      </body>
    </html>
  );
};

export default LoginPage;
