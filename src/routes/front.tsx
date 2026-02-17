import { Hono } from "hono";
import SignInPage from "../pages/signin.js";
import { getUserByEmail } from "../utils/users/getUserByEmail.js";

export const Front = new Hono();

Front.get("/auth/signin", (c) => {
  return c.html(<SignInPage />);
});

Front.post("/auth/signin", async (c) => {
  const body = await c.req.parseBody();
  const email = body.email as string;

  if (!email) {
    return c.json({ error: "Email is required" }, 400);
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return c.html(<SignInPage isFirstTime email={email} />);
  }

  return c.json({
    message: `Sign-in attempted for email: ${email}`,
    user,
  });
});
