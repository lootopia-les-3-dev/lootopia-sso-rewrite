import React from "react"

export const LoginForm = ({ callbackUrl, action = "/api/auth/login" }: { callbackUrl: string; action?: string }) => {
  return (
    <form method="post" action={action} className="mt-7 flex flex-col gap-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-mauve-600 dark:text-mauve-400">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="votre@email.com"
          required
          className="w-full rounded-xl border border-mauve-200 dark:border-mauve-700 bg-white dark:bg-mauve-900 px-3.5 py-2.5 text-sm text-mauve-900 dark:text-mauve-100 placeholder-mauve-300 dark:placeholder-mauve-600 outline-none transition focus:border-mauve-500 focus:ring-3 focus:ring-mauve-500/20"
        />
      </div>

      <button
        type="submit"
        className="mt-1 w-full rounded-xl bg-mauve-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-mauve-700 active:bg-mauve-800 focus:outline-none focus:ring-3 focus:ring-mauve-500/40 cursor-pointer"
      >
        Continuer
      </button>

      <div className="flex items-center gap-3 text-xs text-mauve-400 dark:text-mauve-600 my-1">
        <span className="h-px flex-1 bg-mauve-200 dark:bg-mauve-800" />
        ou
        <span className="h-px flex-1 bg-mauve-200 dark:bg-mauve-800" />
      </div>

      <a
        href={`/api/auth/apple?callbackUrl=${encodeURIComponent(callbackUrl ?? "")}`}
        className="flex items-center justify-center gap-2.5 w-full rounded-xl bg-black dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-black transition hover:bg-zinc-800 dark:hover:bg-zinc-100 focus:outline-none focus:ring-3 focus:ring-zinc-500/30"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 814 1000" width="15" height="15" fill="currentColor">
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.4-150.3-109.4C27.1 652.4 0 541.2 0 434.3c0-195 129.4-297.7 256.6-297.7 65.9 0 120.8 42.8 162.3 42.8 39.5 0 101.8-44.9 173.1-44.9 28 0 130.3 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
        </svg>
        Se connecter avec Apple
      </a>
    </form>
  )
}
