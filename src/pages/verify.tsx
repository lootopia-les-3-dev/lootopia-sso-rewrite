import React from "react"
import Layout from "../components/Layout.js"

const VerifyPage = () => (
  <Layout title="Lootopia — Vérification">
    <div className="w-full max-w-sm bg-white dark:bg-mauve-900 rounded-2xl border border-mauve-100 dark:border-mauve-800 shadow-lg shadow-mauve-100/50 dark:shadow-mauve-950/50 px-10 py-11 text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-mauve-100 dark:bg-mauve-800">
        <svg className="h-6 w-6 text-mauve-600 dark:text-mauve-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-mauve-900 dark:text-mauve-50">
        Vérifiez votre email
      </h1>
      <p className="mt-3 text-sm text-mauve-500 dark:text-mauve-400 leading-relaxed">
        Un lien de connexion vous a été envoyé. Cliquez sur le lien dans cet email pour continuer.
      </p>
    </div>
  </Layout>
)

export default VerifyPage
