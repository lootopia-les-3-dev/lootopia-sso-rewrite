import { eq } from "drizzle-orm"
import db from "../../db/connection.js"
import { users } from "../../db/schema.js"

export const getUserById = async (id: number) => {
  const result = await db.select().from(users).where(eq(users.id, id))
  return result[0] ?? null
}
