import { eq } from "drizzle-orm"
import db from "../../db/connection.js"
import redis from "../../db/redis.js"
import { users } from "../../db/schema.js"

export const updateUserProfile = async (
  userId: number,
  { firstName, lastName }: { firstName: string; lastName: string },
) => {
  await db.update(users).set({ firstName, lastName }).where(eq(users.id, userId))

  const cached = await redis.get(`user:id:${userId}`)
  if (cached) {
    const user = JSON.parse(cached)
    await redis.del(`user:email:${user.email}`)
  }
  await redis.del(`user:id:${userId}`)
}
