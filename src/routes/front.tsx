import { Hono } from "hono"
import SignInPage from "../pages/signin.js"
import { getUserByEmail } from "../utils/users/getUserByEmail.js"
import { createUser } from "../utils/users/createUser.js"
import setCookieController from "../controllers/setCookie.js"

export const Front = new Hono()

Front.get("/auth/signin", (c) => {
  return c.html(<SignInPage />)
})

Front.post("/auth/signin", async (c) => {
  const body = await c.req.parseBody()
  const email = body.email as string
  const firstName = body.firstName as string
  const lastName = body.lastName as string

  const callbackURL = "TODO" // TODO

  if (!email) {
    return c.json({ error: "Email is required" }, 400)
  }

  let user = await getUserByEmail(email)

  if (!user) {
    if (!firstName || !lastName) {
      return c.html(<SignInPage isFirstTime email={email} />)
    }
    user = await createUser(firstName, lastName, email)
  }

  await setCookieController(c)

  return c.redirect(callbackURL)
})
