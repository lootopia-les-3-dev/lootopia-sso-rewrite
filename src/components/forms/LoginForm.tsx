export const LoginForm = () => {
  return (
    <form method="post" action="/api/auth/login">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="votre@email.com"
          required
        />
      </div>

      <input type="submit" value="Se connecter" />
    </form>
  );
};
