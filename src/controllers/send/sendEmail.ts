import axios from "axios"
import type { Context } from "hono"

const sendEmailController = async (c: Context) => {
  const { to, subject, text } = await c.req.json()

  if (!to || !subject || !text) {
    return c.json(
      {
        error: "Missing required fields",
        missing: !to ? "to" : !subject ? "subject" : "text",
      },
      400,
    )
  }

  await axios.post(
    process.env.NOTIFS_API_URL + "/send/email",
    {
      to,
      subject,
      text,
    },
    {
      headers: { "x-api-key": process.env.NOTIFS_API_KEY },
    },
  )

  return c.json({ message: "Email sent successfully" })
}

export default sendEmailController
