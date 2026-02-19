type AuthFormProps = {
  mode: "signin" | "signup"
  email?: string
  callbackUrl?: string
}

export const AuthForm = ({ mode, email, callbackUrl }: AuthFormProps) => {
  const isSignUp = mode === "signup"

  return (
    <form method="post" action={isSignUp ? "/auth/signup" : "/auth/signin"}>
      {callbackUrl && <input type="hidden" name="callback_url" value={callbackUrl} />}

      {isSignUp && (
        <>
          <div class="form-group">
            <label for="firstName">Prénom</label>
            <input id="firstName" name="firstName" type="text" placeholder="Jean" required />
          </div>

          <div class="form-group">
            <label for="lastName">Nom</label>
            <input id="lastName" name="lastName" type="text" placeholder="Dupont" required />
          </div>
        </>
      )}

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email || ""}
          placeholder="votre@email.com"
          required
        />
      </div>

      <input type="submit" value={isSignUp ? "S'inscrire" : "Se connecter"} />
    </form>
  )
}
