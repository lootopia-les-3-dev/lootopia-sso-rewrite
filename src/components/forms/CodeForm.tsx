import React from "react"

export const CodeForm = ({ token, callbackUrl }: { token: string; callbackUrl: string }) => {
  return (
    <form method="post" action="/api/auth/verify-code" className="mt-7 flex flex-col gap-4">
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="code" className="text-xs font-semibold uppercase tracking-wider text-mauve-600 dark:text-mauve-400">
          Code de vérification
        </label>
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
          className="w-full rounded-xl border border-mauve-200 dark:border-mauve-700 bg-white dark:bg-mauve-900 px-3.5 py-2.5 text-sm text-center tracking-[0.4em] text-mauve-900 dark:text-mauve-100 placeholder-mauve-300 dark:placeholder-mauve-600 outline-none transition focus:border-mauve-500 focus:ring-3 focus:ring-mauve-500/20"
        />
      </div>

      <button
        type="submit"
        className="mt-1 w-full rounded-xl bg-mauve-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-mauve-700 active:bg-mauve-800 focus:outline-none focus:ring-3 focus:ring-mauve-500/40 cursor-pointer"
      >
        Vérifier
      </button>
    </form>
  )
}
