import type { Context } from "hono"
import { createUser } from "../../utils/users/createUser.js"

export const createUserController = async (c: Context) => {
  const { firstName, lastName, email } = await c.req.json()

  if (!firstName || !lastName || !email) {
    return c.json(
      {
        error: "Email is required",
        missing: !email ? "email" : !firstName ? "firstName" : "lastName",
      },
      400,
    )
  }

  try {
    const user = await createUser(firstName, lastName, email)
    return c.json(user, 201)
  } catch (error) {
    console.error("Error creating user:", error)
    return c.json({ error: "Failed to create user" }, 500)
  }
}
