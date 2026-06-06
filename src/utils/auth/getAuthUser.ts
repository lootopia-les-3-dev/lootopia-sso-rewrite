import type { Context } from "hono"
import { getSignedCookie } from "hono/cookie"
import { verify } from "hono/jwt"
import type { User } from "../../types/user.js"
import { getUserById } from "../users/getUserById.js"

export const getAuthUser = async (c: Context): Promise<User | null> => {
  let rawToken: string | false | undefined

  const authHeader = c.req.header("Authorization")
  if (authHeader?.startsWith("Bearer ")) {
    rawToken = authHeader.slice(7)
  } else {
    rawToken = await getSignedCookie(c, process.env.JWT_SECRET!, "auth_token")
  }

  if (!rawToken) {
    return null
  }

  let userId: number
  try {
    const { sub } = await verify(rawToken, process.env.JWT_SECRET!, "HS256")
    userId = Number(sub)
  } catch {
    return null
  }

  return getUserById(userId)
}
