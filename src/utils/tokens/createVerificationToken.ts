import db from "../../db/connection.js"
import { verificationTokens } from "../../db/schema.js"

export const createVerificationToken = async (userId: number, callbackUrl?: string) => {
  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24)

  await db.insert(verificationTokens).values({
    userId,
    token,
    expiresAt,
    callbackUrl: callbackUrl ?? null,
  })

  return token
}
