import React from "react"
import Layout from "../components/Layout.js"
import { LoginForm } from "../components/forms/LoginForm.js"

const LoginMobilePage = ({ callbackUrl }: { callbackUrl: string }) => (
  <Layout title="Lootopia — Connexion">
    <div className="w-full max-w-sm bg-white dark:bg-mauve-900 rounded-2xl border border-mauve-100 dark:border-mauve-800 shadow-lg shadow-mauve-100/50 dark:shadow-mauve-950/50 px-10 py-11">
      <h1 className="text-2xl font-bold tracking-tight text-mauve-900 dark:text-mauve-50 text-center">
        Connexion à Lootopia
      </h1>
      <LoginForm callbackUrl={callbackUrl} action="/api/auth/login" />
    </div>
  </Layout>
)

export default LoginMobilePage
