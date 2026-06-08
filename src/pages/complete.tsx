import React from "react"
import Layout from "../components/Layout.js"

type CompletePageProps = {
  callbackUrl?: string
}

const CompletePage = ({ callbackUrl }: CompletePageProps) => (
  <Layout title="Lootopia — Compléter votre profil">
    <div className="w-full max-w-sm bg-white dark:bg-mauve-900 rounded-2xl border border-mauve-100 dark:border-mauve-800 shadow-lg shadow-mauve-100/50 dark:shadow-mauve-950/50 px-10 py-11">
      <h1 className="text-2xl font-bold tracking-tight text-mauve-900 dark:text-mauve-50 text-center">
        Compléter votre profil
      </h1>
      <form method="post" action="/api/auth/complete" className="mt-7 flex flex-col gap-4">
        {callbackUrl && (
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
        )}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-wider text-mauve-600 dark:text-mauve-400">
            Prénom
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Jean"
            required
            className="w-full rounded-xl border border-mauve-200 dark:border-mauve-700 bg-white dark:bg-mauve-900 px-3.5 py-2.5 text-sm text-mauve-900 dark:text-mauve-100 placeholder-mauve-300 dark:placeholder-mauve-600 outline-none transition focus:border-mauve-500 focus:ring-3 focus:ring-mauve-500/20"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-wider text-mauve-600 dark:text-mauve-400">
            Nom
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Dupont"
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
      </form>
    </div>
  </Layout>
)

export default CompletePage
