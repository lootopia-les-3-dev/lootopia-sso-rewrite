import { generateToken } from "../utils/tokens/generateToken.js"
import { insertVerificationToken } from "../utils/tokens/insertVerificationToken.js"

export const createVerificationToken = async (userId: number) => {
  const token = generateToken()
  const code = String(Math.floor(100000 + Math.random() * 900000))
  const expiresAt = new Date(Date.now() + 86400000)

  await insertVerificationToken(userId, token, code, expiresAt)

  return { token, code }
}