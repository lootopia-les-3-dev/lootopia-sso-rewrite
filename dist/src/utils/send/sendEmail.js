import axios from "axios";
export const sendEmail = async (to, subject, body) => {
    await axios.post(`${process.env.NOTIFS_API_URL}/send/email`, { to, subject, body }, {
        headers: { "x-api-key": process.env.NOTIFS_API_KEY },
    });
};
