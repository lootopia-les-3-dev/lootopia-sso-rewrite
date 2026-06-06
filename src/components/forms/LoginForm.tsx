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

      <div className="divider">ou</div>

      <a href={`/api/auth/apple?callbackUrl=${encodeURIComponent(callbackUrl ?? "")}`} className="btn-apple">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 814 1000" width="16" height="16" fill="currentColor">
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.4-150.3-109.4C27.1 652.4 0 541.2 0 434.3c0-195 129.4-297.7 256.6-297.7 65.9 0 120.8 42.8 162.3 42.8 39.5 0 101.8-44.9 173.1-44.9 28 0 130.3 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
        </svg>
        Se connecter avec Apple
      </a>
    </form>
  )
}
