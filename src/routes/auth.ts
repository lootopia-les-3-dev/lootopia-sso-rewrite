import { Hono } from "hono";
import signInController from "../controllers/signin.js";
import setCookieController from "../controllers/setCookie.js";

export const AuthAPI = new Hono();

AuthAPI.post("/signin", signInController); 
AuthAPI.get("/set", setCookieController);