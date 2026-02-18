import { Hono } from "hono"
import SignInPage from "../pages/signin.js"
import { getUserByEmail } from "../utils/users/getUserByEmail.js"
import { createUser } from "../utils/users/createUser.js"
import setCookieController from "../controllers/setCookie.js"
import SignUpPage from "../pages/signup.js"

export const Front = new Hono()

Front.get("/auth/signin", (c) => {
  return c.html(<SignInPage />)
})

Front.post("/auth/signin", async (c) => {
  const body = await c.req.parseBody()
  const email = body.email as string

  if (!email) {
    return c.json({ error: "Email is required" }, 400)
  }

  const user = await getUserByEmail(email)

  if (!user) {
    return c.redirect("/auth/signup?email=" + encodeURIComponent(email))
  }

  await setCookieController(c)

  return c.redirect("verify")
})

Front.get("/auth/signup", (c) => {
  const email = c.req.query("email")
  return c.html(<SignUpPage email={email} />)
})

Front.post("/auth/signup", async (c) => {
  const body = await c.req.parseBody()
  const firstName = body.firstName as string
  const lastName = body.lastName as string
  const email = body.email as string

  if (!firstName || !lastName || !email) {
    return c.json({ error: "All fields are required" }, 400)
  }

  let user = await getUserByEmail(email)

  if (user) {
    return c.json({ error: "User already exists" }, 400)
  }

  user = await createUser(firstName, lastName, email)

  await setCookieController(c)

  return c.redirect("verify")
})
