import { eq } from "drizzle-orm"
import db from "../../db/connection.js"
import redis from "../../db/redis.js"
import { users, verificationTokens } from "../../db/schema.js"

export const deleteUser = async (id: number) => {
  await db.delete(verificationTokens).where(eq(verificationTokens.userId, id))
  await db.delete(users).where(eq(users.id, id))
  await redis.del(`user:id:${id}`)
}
