import React from "react"
import Layout from "../components/Layout.js"
import type { User } from "../types/user.js"

const ProfilePage = ({ user }: { user: User }) => {
  const initials =
    [user.firstName, user.lastName]
      .filter(Boolean)
      .map((n) => n![0].toUpperCase())
      .join("") || user.email[0].toUpperCase()

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ") || null

  return (
    <Layout title="Lootopia — Profil">
      <div className="w-full max-w-sm bg-white dark:bg-mauve-900 rounded-2xl border border-mauve-100 dark:border-mauve-800 shadow-lg shadow-mauve-100/50 dark:shadow-mauve-950/50 px-10 py-11">
        {/* Avatar */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-mauve-600 text-white text-2xl font-bold select-none">
          {initials}
        </div>

        {/* Name & email */}
        <h1 className="text-2xl font-bold tracking-tight text-mauve-900 dark:text-mauve-50 text-center">
          {fullName ?? "Mon profil"}
        </h1>
        <p className="mt-1 text-sm text-mauve-500 dark:text-mauve-400 text-center">{user.email}</p>

        {/* Fields */}
        <div className="mt-7 flex flex-col gap-3">
          {[
            { label: "Prénom", value: user.firstName },
            { label: "Nom", value: user.lastName },
            { label: "Email", value: user.email },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl border border-mauve-100 dark:border-mauve-700/60 bg-mauve-50 dark:bg-mauve-800/40 px-4 py-3"
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-mauve-400 dark:text-mauve-500 mb-0.5">
                {label}
              </p>
              <p className="text-sm font-medium text-mauve-800 dark:text-mauve-200">
                {value || "—"}
              </p>
            </div>
          ))}
        </div>

        {/* Logout */}
        <button
          id="logout-btn"
          className="mt-6 w-full rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 px-6 py-3 text-sm font-semibold text-red-600 dark:text-red-400 transition hover:bg-red-100 dark:hover:bg-red-950/60 focus:outline-none focus:ring-3 focus:ring-red-500/30 cursor-pointer"
        >
          Se déconnecter
        </button>

        {/* Delete account */}
        <div className="mt-4 border-t border-mauve-100 dark:border-mauve-800 pt-4">
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
            __html: `document.getElementById('logout-btn').addEventListener('click',async()=>{await fetch('/api/auth/logout',{method:'POST',credentials:'include'});window.location.href='/login';});document.getElementById('delete-account-btn').addEventListener('click',async()=>{if(!confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.'))return;const res=await fetch('/api/auth/account',{method:'DELETE',credentials:'include'});if(res.ok){window.location.href='/login';}else{alert('Une erreur est survenue. Veuillez réessayer.');}});`,
          }}
        />
      </div>
    </Layout>
  )
}

export default ProfilePage
