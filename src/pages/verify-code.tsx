import React from "react"
import Layout from "../components/Layout.js"
import { CodeForm } from "../components/forms/CodeForm.js"

const VerifyCodePage = ({ token, callbackUrl }: { token: string; callbackUrl: string }) => (
  <Layout title="Lootopia — Vérification">
    <div className="w-full max-w-sm bg-white dark:bg-mauve-900 rounded-2xl border border-mauve-100 dark:border-mauve-800 shadow-lg shadow-mauve-100/50 dark:shadow-mauve-950/50 px-10 py-11">
      <h1 className="text-2xl font-bold tracking-tight text-mauve-900 dark:text-mauve-50 text-center">
        Entrez votre code
      </h1>
      <p className="mt-2 text-sm text-mauve-500 dark:text-mauve-400 text-center leading-relaxed">
        Un code à 6 chiffres vous a été envoyé par email.
      </p>
      <CodeForm token={token} callbackUrl={callbackUrl} />
    </div>
  </Layout>
)

export default VerifyCodePage
