export const SignInForm = ({ email }: { email?: string }) => {
  return (
    <form method="post" action="/auth/signin">
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
  )
}
