import { and, eq } from "drizzle-orm"
import { verificationTokens } from "../../db/schema.js"
import db from "../../db/connection.js"

export const getVerificationTokenByCode = async (token: string, code: string) => {
  const result = await db
    .select()
    .from(verificationTokens)
    .where(and(eq(verificationTokens.token, token), eq(verificationTokens.code, code)))
  return result[0]
}
