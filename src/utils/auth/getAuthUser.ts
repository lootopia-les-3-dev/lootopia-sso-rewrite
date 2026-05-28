import type { Context } from "hono"
import { getSignedCookie } from "hono/cookie"
import { verify } from "hono/jwt"
import { getUserById } from "../users/getUserById.js"
import type { User } from "../../types/user.js"

export const getAuthUser = async (c: Context): Promise<User | null> => {
  const cookieToken = await getSignedCookie(c, process.env.JWT_SECRET!, "auth_token")
  const authHeader = c.req.header("authorization") ?? c.req.header("Authorization")
  const bearerToken = authHeader?.toLowerCase().startsWith("bearer ")
    ? authHeader.slice(7).trim()
    : null
  const token = cookieToken || bearerToken

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
