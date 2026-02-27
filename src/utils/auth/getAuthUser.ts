import type { Context } from "hono"
import { getSignedCookie } from "hono/cookie"
import { verify } from "hono/jwt"
import { getUserById } from "../users/getUserById.js"
import type { User } from "../../types/user.js"

export const getAuthUser = async (c: Context): Promise<User | null> => {
  const token = await getSignedCookie(c, process.env.JWT_SECRET!, "auth_token")

  if (!token) {
    return null
  }

  let userId: number
  try {
    const { sub } = await verify(token, process.env.JWT_SECRET!, "HS256")
    userId = Number(sub)
  } catch {
    return null
  }

  return getUserById(userId)
}
