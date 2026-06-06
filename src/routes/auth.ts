import { Hono } from "hono"
import { appleCallbackController, appleRedirectController } from "../controllers/auth/appleController.js"
import { appleMobileController } from "../controllers/auth/appleMobileController.js"
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

// Apple Sign In
AuthAPI.get("/apple", appleRedirectController)
AuthAPI.post("/apple/callback", appleCallbackController)
AuthAPI.post("/apple/mobile", appleMobileController)
