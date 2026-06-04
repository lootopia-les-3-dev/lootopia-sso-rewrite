import type { Context } from "hono"
import { getAuthUser } from "../../utils/auth/getAuthUser.js"

export const meController = async (c: Context) => {
  console.log(c)
  const user = await getAuthUser(c)

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401)
  }

  return c.json({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  })
}
