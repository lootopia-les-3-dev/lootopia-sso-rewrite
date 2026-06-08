import React from "react"
import Layout from "../components/Layout.js"
import type { User } from "../types/user.js"

const AccountPage = ({ user }: { user: User }) => (
  <Layout title="Lootopia — Compte">
    <div className="w-full max-w-sm bg-white dark:bg-mauve-900 rounded-2xl border border-mauve-100 dark:border-mauve-800 shadow-lg shadow-mauve-100/50 dark:shadow-mauve-950/50 px-10 py-11">
      <h1 className="text-2xl font-bold tracking-tight text-mauve-900 dark:text-mauve-50 text-center">
        Mon compte
      </h1>
      <p className="mt-2 text-sm text-mauve-500 dark:text-mauve-400 text-center">
        Bienvenue, {user.firstName ?? user.email} !
      </p>
      <div className="mt-6 rounded-xl border border-mauve-100 dark:border-mauve-700/60 bg-mauve-50 dark:bg-mauve-800/40 px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-mauve-400 dark:text-mauve-500 mb-0.5">Email</p>
        <p className="text-sm font-medium text-mauve-800 dark:text-mauve-200">{user.email}</p>
      </div>

      <div className="mt-8 border-t border-mauve-100 dark:border-mauve-800 pt-6">
        <p className="text-xs text-mauve-400 dark:text-mauve-500 text-center mb-3">Zone dangereuse</p>
        <button
          id="delete-account-btn"
          className="w-full rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 px-6 py-3 text-sm font-semibold text-red-600 dark:text-red-400 transition hover:bg-red-100 dark:hover:bg-red-950/60 focus:outline-none focus:ring-3 focus:ring-red-500/30 cursor-pointer"
        >
          Supprimer mon compte
        </button>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `document.getElementById('delete-account-btn').addEventListener('click',async()=>{if(!confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.'))return;const res=await fetch('/api/auth/account',{method:'DELETE',credentials:'include'});if(res.ok){window.location.href='/login';}else{alert('Une erreur est survenue. Veuillez réessayer.');}});`,
        }}
      />
    </div>
  </Layout>
)

export default AccountPage
