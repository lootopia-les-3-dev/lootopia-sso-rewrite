import type { Context } from "hono"
import { sendEmail } from "../../utils/send/sendEmail.js"

const sendEmailController = async (c: Context) => {
  const { to, subject, body } = await c.req.json()

  if (!to || !subject || !body) {
    return c.json(
      {
        error: "Missing required fields",
        missing: !to ? "to" : !subject ? "subject" : "body",
      },
      400,
    )
  }

  await sendEmail(to, subject, body)

  return c.json({ message: "Email sent successfully" })
}

export default sendEmailController
