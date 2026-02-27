import { generateToken } from "../utils/tokens/generateToken.js"
import { insertVerificationToken } from "../utils/tokens/insertVerificationToken.js"

export const createVerificationToken = async (userId: number) => {
  const token = generateToken()
  const expiresAt = new Date(Date.now() + 86400000)

  await insertVerificationToken(userId, token, expiresAt)

  return token
}