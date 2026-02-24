type LoginFormProps = {
  email?: string
  callbackUrl?: string
}

export const LoginForm = ({ email, callbackUrl }: LoginFormProps) => {
  return (
    <form method="post" action="/api/auth/login">
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
