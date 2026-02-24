import db from "../../db/connection.js"
import { verificationTokens } from "../../db/schema.js"

export const createVerificationToken = async (userId: number) => {
  const tokenBytes = new Uint8Array(24)
  crypto.getRandomValues(tokenBytes)
  const token = Buffer.from(tokenBytes).toString("base64url")
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24)

  await db.insert(verificationTokens).values({
    userId,
    token,
    expiresAt,
  })

  return token
}
