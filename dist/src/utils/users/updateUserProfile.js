import { eq } from "drizzle-orm";
import db from "../../db/connection.js";
import { users } from "../../db/schema.js";
export const updateUserProfile = async (userId, data) => {
    await db.update(users).set(data).where(eq(users.id, userId));
};
