import type { Context } from "hono";

const signInController = async (c: Context) => {
  const body = await c.req.json();
  const email = body.email;

  if (!email) {
    return c.json({ error: "Email is required" }, 400);
  }
  
  return c.json({ message: `Sign-in attempted for email: ${email}` });
};

export default signInController;
