import React from "react"

export const CodeForm = ({ token, callbackUrl }: { token: string; callbackUrl: string }) => {
  return (
    <form method="post" action="/api/auth/verify-code">
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <div className="form-group">
        <label htmlFor="code">Code de vérification</label>
        <input
          id="code"
          type="text"
          name="code"
          inputMode="numeric"
          pattern="[0-9]{6}"
          maxLength={6}
          placeholder="123456"
          required
          autoComplete="one-time-code"
        />
      </div>

      <input type="submit" value="Vérifier" />
    </form>
  )
}
