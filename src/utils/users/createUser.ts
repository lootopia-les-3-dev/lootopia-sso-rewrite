import db from "../../db/connection.js"
import { users } from "../../db/schema.js"

export const createUser = async (firstName: string, lastName: string, email: string) => {
  const result = await db.insert(users).values({ firstName, lastName, email }).returning()
  return result[0]
}