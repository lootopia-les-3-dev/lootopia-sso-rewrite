import type { Context } from "hono"
import { deleteCookie, getCookie } from "hono/cookie"
import { sendAccountDeletionEmail } from "../../services/emailService.js"
import { getAuthUser } from "../../utils/auth/getAuthUser.js"
import { deleteUser } from "../../utils/users/deleteUser.js"

export const deleteAccountController = async (c: Context) => {
  const user = await getAuthUser(c)

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401)
  }

  const rawCookie = getCookie(c, "auth_token")
  const apiUrl = process.env.API_URL

  if (apiUrl && rawCookie) {
    const res = await fetch(`${apiUrl}/users/me`, {
      method: "DELETE",
      headers: { Cookie: `auth_token=${rawCookie}` },
    })

    if (!res.ok && res.status !== 404) {
      return c.json({ error: "Failed to delete account data" }, 502)
    }
  }

  const { email } = user

  await deleteUser(user.id)

  sendAccountDeletionEmail(email).catch(() => {})

  const url = new URL(c.req.url)
  const globalDomain = url.host.split(".").slice(-2).join(".")

  deleteCookie(c, "auth_token", {
    httpOnly: true,
    secure: true,
    domain: `.${globalDomain}`,
    sameSite: "Lax",
    path: "/",
  })

  return c.json({ success: true })
}
