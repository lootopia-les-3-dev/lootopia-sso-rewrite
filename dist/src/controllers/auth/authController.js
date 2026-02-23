import { getUserByEmail } from "../../utils/users/getUserByEmail.js";
import { createUser } from "../../utils/users/createUser.js";
import { createVerificationToken } from "../../utils/tokens/createVerificationToken.js";
import { sendEmail } from "../../utils/send/sendEmail.js";
export const authController = async (c) => {
    const body = await c.req.parseBody();
    const email = body.email;
    const callbackUrl = body.callback_url;
    if (!email) {
        return c.json({ error: "Email is required" }, 400);
    }
    let user = await getUserByEmail(email);
    if (!user) {
        user = await createUser(email);
    }
    const token = await createVerificationToken(user.id, callbackUrl);
    const verifyUrl = `${process.env.BASE_URL}/api/auth/verify?token=${token}`;
    await sendEmail(email, "Connexion à Lootopia", `Cliquez sur ce lien pour vous connecter : ${verifyUrl}`);
    return c.redirect("/auth/verify");
};
