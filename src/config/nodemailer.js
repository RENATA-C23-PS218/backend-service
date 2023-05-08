const nodemailer = require("nodemailer");
const OAuth2Client = require("./oauth");

OAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const sendEmail = async (to, subject, html) => {
  try {
    const accessToken = await OAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_EMAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const info = await transport.sendMail({
      to,
      subject,
      html,
    });

    console.log(`Message sent: ${info.messageId}`);
  } catch (err) {
    throw err;
  }
};

module.exports = sendEmail;
