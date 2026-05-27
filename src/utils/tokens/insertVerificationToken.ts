import db from "../../db/connection.js"
import { verificationTokens } from "../../db/schema.js"

export const insertVerificationToken = async (userId: number, token: string, code: string, expiresAt: Date) => {
  await db.insert(verificationTokens).values({
    userId,
    token,
    code,
    expiresAt,
  })
}