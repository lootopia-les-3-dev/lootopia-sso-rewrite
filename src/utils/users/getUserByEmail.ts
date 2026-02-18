import { eq } from "drizzle-orm"
import { users } from "../../db/schema.js"
import db from "../../db/connection.js"

export const getUserByEmail = async (email: string) => {
  const user = await db.select().from(users).where(eq(users.email, email))
  return user[0]
}
