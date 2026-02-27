import { Hono } from "hono"
import { verifyController } from "../controllers/auth/verifyController.js"
import { completeController } from "../controllers/auth/completeController.js"
import { loginController } from "../controllers/auth/loginController.js"
import { verifyTokenMiddleware } from "../middleware/verifyToken.js"

export const AuthAPI = new Hono()

AuthAPI.post("/login", loginController)
AuthAPI.get("/verify", verifyTokenMiddleware, verifyController)
AuthAPI.post("/complete", completeController)
