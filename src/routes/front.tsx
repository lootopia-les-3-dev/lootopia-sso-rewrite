import React from "react"
import { Hono } from "hono"
import CompletePage from "../pages/complete.js"
import LoginPage from "../pages/login.js"
import VerifyPage from "../pages/verify.js"
import AccountPage from "../pages/account.js"
import { getAuthUser } from "../utils/auth/getAuthUser.js"

export const Front = new Hono()

Front.get("/login", (c) => {
  const { callbackUrl } = c.req.query()
  return c.html(<LoginPage callbackUrl={callbackUrl} />)
})

Front.get("/verify", (c) => {
  return c.html(<VerifyPage />)
})

Front.get("/complete", (c) => {
  const callbackUrl = c.req.query("callbackUrl")
  return c.html(<CompletePage callbackUrl={callbackUrl} />)
})

Front.get("/account", async (c) => {
  const user = await getAuthUser(c)

  if (!user) {
    return c.redirect("/login")
  }

  return c.html(<AccountPage user={user} />)
})
