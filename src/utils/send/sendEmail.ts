import axios from "axios"

export const sendEmail = async (to: string, subject: string, body: string, html?: string) => {
  await axios.post(
    `${process.env.NOTIFS_API_URL}/send/email`,
    { to, subject, body, ...(html ? { html } : {}) },
    {
      headers: { "x-api-key": process.env.NOTIFS_API_KEY },
    },
  )
}
