type SignInFormProps = {
  isFirstTime: boolean;
  email?: string;
};

export const SignInForm = ({ isFirstTime, email }: SignInFormProps) => {
  return (
    <form method="post" action="/auth/signin">
      {isFirstTime && (
        <>
          <h1>Création de votre compte</h1>

          <div className="form-group">
            <label htmlFor="firstName">Prénom</label>
            <input id="firstName" name="firstName" type="text" required />

            <label htmlFor="lastName">Nom</label>
            <input id="lastName" name="lastName" type="text" required />
          </div>
        </>
      )}

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email || ""}
          required
        />
      </div>

      <input type="submit" value="Se connecter" />
    </form>
  );
};
