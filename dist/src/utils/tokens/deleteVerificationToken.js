import { eq } from "drizzle-orm";
import db from "../../db/connection.js";
import { verificationTokens } from "../../db/schema.js";
export const deleteVerificationToken = async (id) => {
    await db.delete(verificationTokens).where(eq(verificationTokens.id, id));
};
