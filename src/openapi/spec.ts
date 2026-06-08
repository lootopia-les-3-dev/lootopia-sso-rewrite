export const openApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "Lootopia SSO API",
    version: "1.0.0",
    description:
      "Single Sign-On service for Lootopia — magic link + mobile code authentication.",
  },
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "auth_token",
        description: "Signed JWT stored as a cookie by the SSO service.",
      },
    },
    schemas: {
      Error: {
        type: "object",
        required: ["error"],
        properties: { error: { type: "string" } },
      },
      User: {
        type: "object",
        required: ["id", "email"],
        properties: {
          id: { type: "integer" },
          email: { type: "string", format: "email" },
          firstName: { type: "string", nullable: true },
          lastName: { type: "string", nullable: true },
        },
      },
      AuthResponse: {
        type: "object",
        required: ["token", "user"],
        description: "Returned when Accept: application/json is set (mobile clients).",
        properties: {
          token: { type: "string", description: "Raw signed JWT (auth_token cookie value)." },
          user: {
            allOf: [
              { $ref: "#/components/schemas/User" },
              {
                type: "object",
                required: ["profileComplete"],
                properties: { profileComplete: { type: "boolean" } },
              },
            ],
          },
        },
      },
    },
  },
  paths: {
    "/.well-known/apple-app-site-association": {
      get: {
        tags: ["System"],
        summary: "Apple App Site Association",
        operationId: "appleAppSiteAssociation",
        description: "Apple Universal Links manifest. Required for deep linking from /api/auth/verify and /api/auth/apple/callback into the iOS app.",
        responses: {
          "200": {
            description: "AASA JSON",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    applinks: {
                      type: "object",
                      properties: {
                        apps: { type: "array", items: { type: "string" } },
                        details: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              appID: { type: "string" },
                              paths: { type: "array", items: { type: "string" } },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/health": {
      get: {
        tags: ["System"],
        summary: "Health check",
        operationId: "health",
        responses: {
          "200": {
            description: "Service is up",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { status: { type: "string", example: "ok" } },
                },
              },
            },
          },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Initiate email login",
        operationId: "login",
        description:
          "Sends a verification email with a magic link. Redirects to /verify on success.",
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                required: ["email"],
                properties: {
                  email: { type: "string", format: "email" },
                  callbackUrl: { type: "string", format: "uri" },
                },
              },
            },
          },
        },
        responses: {
          "302": { description: "Redirect to /verify" },
          "400": {
            description: "Missing email",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
        },
      },
    },
    "/api/auth/login-mobile": {
      post: {
        tags: ["Auth"],
        summary: "Initiate mobile login",
        operationId: "loginMobile",
        description:
          "Sends a verification email with a magic link. Returns { ok: true } on success.",
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                required: ["email"],
                properties: {
                  email: { type: "string", format: "email" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Email sent",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean", example: true } },
                },
              },
            },
          },
          "400": {
            description: "Missing email",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
        },
      },
    },
    "/api/auth/verify": {
      get: {
        tags: ["Auth"],
        summary: "Verify magic link token",
        operationId: "verify",
        description:
          "Validates the token from the email link, sets auth cookie, and redirects.",
        parameters: [
          {
            name: "token",
            in: "query",
            required: true,
            schema: { type: "string" },
          },
          {
            name: "callbackUrl",
            in: "query",
            required: false,
            schema: { type: "string", format: "uri" },
          },
        ],
        responses: {
          "200": {
            description: "Token verified (when Accept: application/json). Sets auth cookie.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/AuthResponse" } },
            },
          },
          "302": { description: "Redirect to callbackUrl or /complete (browser flow)" },
          "400": {
            description: "Invalid or expired token",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
        },
      },
    },
    "/api/auth/verify-code": {
      post: {
        tags: ["Auth"],
        summary: "Verify 6-digit code (mobile)",
        operationId: "verifyCode",
        description:
          "Validates the 6-digit code from the mobile verification email, sets auth cookie.",
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                required: ["token", "code"],
                properties: {
                  token: { type: "string" },
                  code: { type: "string", minLength: 6, maxLength: 6 },
                  callbackUrl: { type: "string", format: "uri" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Code verified (when Accept: application/json). Sets auth cookie.",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/AuthResponse" } },
            },
          },
          "302": { description: "Redirect to callbackUrl or /complete (browser flow)" },
          "400": {
            description: "Invalid or expired code",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
        },
      },
    },
    "/api/auth/complete": {
      post: {
        tags: ["Auth"],
        summary: "Complete user profile",
        operationId: "complete",
        description:
          "Sets first and last name for newly registered users. Requires auth cookie.",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                required: ["firstName", "lastName"],
                properties: {
                  firstName: { type: "string", minLength: 1 },
                  lastName: { type: "string", minLength: 1 },
                  callbackUrl: { type: "string", format: "uri" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Profile updated (when Accept: application/json).",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/User" } },
            },
          },
          "302": { description: "Redirect to callbackUrl (browser flow)" },
          "400": {
            description: "Missing fields",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
        },
      },
    },
    "/api/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get current authenticated user",
        operationId: "me",
        description: "Returns the user object from the auth cookie.",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": {
            description: "Authenticated user",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/User" } },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
        },
      },
    },
    "/api/auth/token": {
      get: {
        tags: ["Auth"],
        summary: "Get raw auth token",
        operationId: "token",
        description:
          "Returns the raw signed JWT cookie value for use in other services.",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": {
            description: "Auth token",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["token"],
                  properties: { token: { type: "string" } },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
        },
      },
    },
    "/api/auth/apple": {
      get: {
        tags: ["Apple"],
        summary: "Initiate Apple OAuth (web)",
        operationId: "appleRedirect",
        description: "Redirects the user to Apple's OAuth authorization page.",
        parameters: [
          {
            name: "callbackUrl",
            in: "query",
            required: false,
            description: "URL to redirect to after successful authentication.",
            schema: { type: "string", format: "uri" },
          },
        ],
        responses: {
          "302": { description: "Redirect to Apple login" },
        },
      },
    },
    "/api/auth/apple/callback": {
      post: {
        tags: ["Apple"],
        summary: "Apple OAuth callback (web)",
        operationId: "appleCallback",
        description: "Apple posts the authorization code here. Sets auth cookie and redirects.",
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                required: ["code"],
                properties: {
                  code: { type: "string" },
                  state: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "302": { description: "Redirect to callbackUrl or /complete" },
          "400": {
            description: "Missing or invalid code",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
        },
      },
    },
    "/api/auth/apple/mobile": {
      post: {
        tags: ["Apple"],
        summary: "Apple Sign In (mobile native)",
        operationId: "appleMobile",
        description: "Validates the identityToken from the native iOS Sign in with Apple SDK. Returns token + user, sets auth cookie.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["identityToken"],
                properties: {
                  identityToken: { type: "string" },
                  firstName: { type: "string" },
                  lastName: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Authenticated user",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/User" },
                    {
                      type: "object",
                      required: ["token", "profileComplete"],
                      properties: {
                        token: { type: "string", description: "Raw signed JWT (auth_token cookie value)." },
                        profileComplete: { type: "boolean" },
                      },
                    },
                  ],
                },
              },
            },
          },
          "400": {
            description: "Invalid token",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
        },
      },
    },
    "/api/auth/account": {
      delete: {
        tags: ["Auth"],
        summary: "Delete account",
        operationId: "deleteAccount",
        description:
          "Permanently deletes the authenticated user's account and all associated data (RGPD). Cascades to the Lootopia API, clears the auth cookie, and sends a confirmation email.",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": {
            description: "Account deleted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { success: { type: "boolean" } },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
          "502": {
            description: "Lootopia API failed to delete user data",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Error" } },
            },
          },
        },
      },
    },
    "/api/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Logout",
        operationId: "logout",
        description: "Deletes the auth cookie.",
        responses: {
          "200": {
            description: "Logged out",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { success: { type: "boolean" } },
                },
              },
            },
          },
        },
      },
    },
  },
} as const
