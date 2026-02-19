import { eq } from "drizzle-orm"
import db from "../../db/connection.js"
import { users } from "../../db/schema.js"

export const verifyUser = async (userId: number) => {
  await db.update(users).set({ verified: true }).where(eq(users.id, userId))
}
