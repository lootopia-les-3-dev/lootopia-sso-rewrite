import { eq } from "drizzle-orm"
import db from "../../db/connection.js"
import { users } from "../../db/schema.js"

export const updateUserProfile = async (
  userId: number,
  { firstName, lastName }: { firstName: string; lastName: string },
) => {
  await db.update(users).set({ firstName, lastName }).where(eq(users.id, userId))
}
