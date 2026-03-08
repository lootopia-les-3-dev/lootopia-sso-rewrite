import { eq } from "drizzle-orm"
import db from "../../db/connection.js"
import redis from "../../db/redis.js"
import { users } from "../../db/schema.js"

const TTL = 300

export const getUserById = async (id: number) => {
  const cacheKey = `user:id:${id}`

  const cached = await redis.get(cacheKey)
  if (cached) {
    return JSON.parse(cached)
  }

  const result = await db.select().from(users).where(eq(users.id, id))
  const user = result[0]

  if (user) {
    await redis.set(cacheKey, JSON.stringify(user), "EX", TTL)
  }

  return user
}
