import React from "react"
import { Hono } from "hono"
import CompletePage from "../pages/complete.js"
import LoginPage from "../pages/login.js"
import LoginMobilePage from "../pages/login-mobile.js"
import VerifyPage from "../pages/verify.js"
import VerifyCodePage from "../pages/verify-code.js"
import AccountPage from "../pages/account.js"
import ProfilePage from "../pages/profile.js"
import { getAuthUser } from "../utils/auth/getAuthUser.js"

export const Front = new Hono()

Front.get("/login", async (c) => {
  const user = await getAuthUser(c)
  if (user) {
    const base = new URL(process.env.BASE_URL!)
    const rootUrl = `${base.protocol}//${base.hostname.split(".").slice(-2).join(".")}`
    return c.redirect(rootUrl)
  }
  const { callbackUrl } = c.req.query()
  return c.html(<LoginPage callbackUrl={callbackUrl} />)
})

Front.get("/verify", (c) => {
  return c.html(<VerifyPage />)
})

Front.get("/login-mobile", (c) => {
  const { callbackUrl } = c.req.query()
  return c.html(<LoginMobilePage callbackUrl={callbackUrl} />)
})

Front.get("/verify-code", (c) => {
  const { token, callbackUrl } = c.req.query()
  return c.html(<VerifyCodePage token={token} callbackUrl={callbackUrl ?? ""} />)
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

Front.get("/profile", async (c) => {
  const user = await getAuthUser(c)

  if (!user) {
    return c.redirect("/login")
  }

  return c.html(<ProfilePage user={user} />)
})
