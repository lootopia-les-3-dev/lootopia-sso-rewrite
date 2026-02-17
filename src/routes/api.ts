import { Hono } from "hono";
import { AuthAPI } from "./auth.js";

export const API = new Hono();

API.get("/health", (c) => c.json({ status: "ok" }));
API.route("/auth", AuthAPI)