type AuthFormProps = {
  email?: string
  callbackUrl?: string
}

export const AuthForm = ({ email, callbackUrl }: AuthFormProps) => {
  return (
    <form method="post" action="/api/auth">
      {callbackUrl && <input type="hidden" name="callback_url" value={callbackUrl} />}

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

      <input type="submit" value="Continuer" />
    </form>
  )
}
