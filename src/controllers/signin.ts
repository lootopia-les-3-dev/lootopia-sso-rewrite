import type { Context } from "hono";

const signInController = async (c: Context) => {
  const email = (await c.req.formData()).get("email");
  
  return c.json({ message: `Sign-in attempted for email: ${email}` });
};

export default signInController;
