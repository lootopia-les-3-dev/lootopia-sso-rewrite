import { createUser } from "../../utils/users/createUser.js";
export const createUserController = async (c) => {
    const { email } = await c.req.json();
    if (!email) {
        return c.json({ error: "Email is required" }, 400);
    }
    try {
        const user = await createUser(email);
        return c.json(user, 201);
    }
    catch (error) {
        console.error("Error creating user:", error);
        return c.json({ error: "Failed to create user" }, 500);
    }
};
