export const LoginForm = ({ callbackUrl }: { callbackUrl: string }) => {
  return (
    <form method="post" action="/api/auth/login">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value=""
          placeholder="votre@email.com"
          required
        />
      </div>

      <input type="submit" value="Continuer" />
    </form>
  )
}
