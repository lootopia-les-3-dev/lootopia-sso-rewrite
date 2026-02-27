import { insertUser } from "../utils/users/insertUser.js"
import { getUserByEmail } from "../utils/users/getUserByEmail.js"

export const findOrCreateUser = async (email: string) => {
  let user = await getUserByEmail(email)

  if (!user) {
    user = await insertUser(email)
  }

  return user
}