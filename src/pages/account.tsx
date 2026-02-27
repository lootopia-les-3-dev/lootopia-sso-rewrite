import React from "react"
import type { User } from "../types/user.js"

const AccountPage = ({ user }: { user: User }) => {
  return (
    <div>
      <h1>Account Page</h1>
      <p>Welcome, {user.firstName}!</p>
      <p>Email: {user.email}</p>
    </div>
  )
}

export default AccountPage
