const { createTransport } = require("nodemailer");

// Configures Email Sender
const EmailSender = createTransport({
  pool: true,
  maxMessages: Infinity,
  maxConnections: 30,
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  connectionTimeout: 5000,
});

const SendEmail = async (EmailData) => {
  const emailOptions = { from: process.env.MAIL_USER, ...EmailData };

  const result = await EmailSender.sendMail(emailOptions);
  console.log(result);
};

module.exports = { SendEmail };
