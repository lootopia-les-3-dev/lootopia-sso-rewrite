import { Hono } from "hono"
import CompletePage from "../pages/complete.js"
import LoginPage from "../pages/login.js"
import SuccessPage from "../pages/success.js"
import VerifyPage from "../pages/verify.js"

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

Front.get("/success", (c) => {
  return c.html(<SuccessPage />)
})
