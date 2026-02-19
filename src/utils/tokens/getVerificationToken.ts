import { eq } from "drizzle-orm"
import { verificationTokens } from "../../db/schema.js"
import db from "../../db/connection.js"

export const getVerificationToken = async (token: string) => {
  const result = await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.token, token))
  return result[0]
}
