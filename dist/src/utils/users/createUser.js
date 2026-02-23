import db from "../../db/connection.js";
import { users } from "../../db/schema.js";
export const createUser = async (email) => {
    const result = await db.insert(users).values({ email }).returning();
    return result[0];
};
