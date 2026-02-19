import { Hono } from "hono"
import { signInController } from "../controllers/auth/signInController.js"
import { signUpController } from "../controllers/auth/signUpController.js"
import { verifyController } from "../controllers/auth/verifyController.js"

export const AuthAPI = new Hono()

AuthAPI.post("/signup", signUpController)
AuthAPI.post("/signin", signInController)
AuthAPI.get("/verify", verifyController)