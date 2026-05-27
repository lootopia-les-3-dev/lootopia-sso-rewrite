import React from "react"

export const LoginForm = ({ callbackUrl, action = "/api/auth/login" }: { callbackUrl: string; action?: string }) => {
  return (
    <form method="post" action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <div className="form-group">
        <label htmlFor="email">Email</label>
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
