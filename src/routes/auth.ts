import { Hono } from "hono"
import { completeController } from "../controllers/auth/completeController.js"
import { loginController } from "../controllers/auth/loginController.js"
import { loginMobileController } from "../controllers/auth/loginMobileController.js"
import { logoutController } from "../controllers/auth/logoutController.js"
import { meController } from "../controllers/auth/meController.js"
import { tokenController } from "../controllers/auth/tokenController.js"
import { verifyCodeController } from "../controllers/auth/verifyCodeController.js"
import { verifyController } from "../controllers/auth/verifyController.js"
import { verifyTokenMiddleware } from "../middleware/verifyToken.js"

export const AuthAPI = new Hono()

AuthAPI.post("/login", loginController)
AuthAPI.post("/login-mobile", loginMobileController)
AuthAPI.get("/verify", verifyTokenMiddleware, verifyController)
AuthAPI.post("/verify-code", verifyCodeController)
AuthAPI.post("/complete", completeController)
AuthAPI.get("/me", meController)
AuthAPI.get("/token", tokenController)
AuthAPI.post("/logout", logoutController)
