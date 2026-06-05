import type { Context } from "hono"
import { getSignedCookie } from "hono/cookie"
import { verify } from "hono/jwt"
import type { User } from "../../types/user.js"
import { getUserById } from "../users/getUserById.js"

export const getAuthUser = async (c: Context): Promise<User | null> => {
  const token = await getSignedCookie(c, process.env.JWT_SECRET!, "auth_token")

  console.log("Token:", token)

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
  console.log(userId)

  return getUserById(userId)
}
