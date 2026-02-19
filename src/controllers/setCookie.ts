import type { Context } from "hono"
import { setSignedCookie } from "hono/cookie"

export const setAuthCookie = async (c: Context, userId: number) => {
  await setSignedCookie(c, "auth_token", String(userId), process.env.JWT_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    domain: process.env.NODE_ENV === "production" ? ".lootopia.io" : undefined,
    sameSite: "Lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export default setAuthCookie
