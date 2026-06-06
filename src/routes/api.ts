import { Hono } from "hono"
import { Scalar } from "@scalar/hono-api-reference"
import { openApiSpec } from "../openapi/spec.js"
import { AuthAPI } from "./auth.js"

export const API = new Hono()

API.get("/health", (c) => c.json({ status: "ok" }))

API.route("/auth", AuthAPI)

API.get("/doc", (c) => c.json(openApiSpec))

API.get("/scalar", Scalar({ url: "/api/doc", pageTitle: "Lootopia SSO — API Reference" }))
