import { Hono } from "hono"
import AuthPage from "../pages/auth.js"
import CompletePage from "../pages/complete.js"
import SuccessPage from "../pages/success.js"
import VerifyPage from "../pages/verify.js"

export const Front = new Hono().basePath("/auth")

Front.get("/", (c) => {
  const email = c.req.query("email")
  const callbackUrl = c.req.query("callback_url")
  return c.html(<AuthPage email={email} callbackUrl={callbackUrl} />)
})

Front.get("/signin", (c) => {
  const email = c.req.query("email")
  const callbackUrl = c.req.query("callback_url")
  const params = new URLSearchParams()
  if (email) params.set("email", email)
  if (callbackUrl) params.set("callback_url", callbackUrl)
  return c.redirect("/auth" + (params.size ? "?" + params.toString() : ""))
})

Front.get("/signup", (c) => {
  const email = c.req.query("email")
  const callbackUrl = c.req.query("callback_url")
  const params = new URLSearchParams()
  if (email) params.set("email", email)
  if (callbackUrl) params.set("callback_url", callbackUrl)
  return c.redirect("/auth" + (params.size ? "?" + params.toString() : ""))
})

Front.get("/verify", (c) => {
  return c.html(<VerifyPage />)
})

Front.get("/complete", (c) => {
  const callbackUrl = c.req.query("callback_url")
  return c.html(<CompletePage callbackUrl={callbackUrl} />)
})

Front.get("/success", (c) => {
  return c.html(<SuccessPage />)
})
