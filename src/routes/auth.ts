import { Hono } from "hono"
import { completeController } from "../controllers/auth/completeController.js"
import { loginController } from "../controllers/auth/loginController.js"
import { meController } from "../controllers/auth/meController.js"
import { verifyController } from "../controllers/auth/verifyController.js"
import { authMiddleware } from "../middleware/auth.js"
import { verifyTokenMiddleware } from "../middleware/verifyToken.js"

export const AuthAPI = new Hono()

AuthAPI.post("/login", loginController)
AuthAPI.get("/verify", verifyTokenMiddleware, verifyController)
AuthAPI.post("/complete", authMiddleware, completeController)
AuthAPI.get("/me", meController)
