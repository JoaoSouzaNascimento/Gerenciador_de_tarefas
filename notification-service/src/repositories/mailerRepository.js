const nodemailer = require('nodemailer');
require("dotenv").config({path:".env"})

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAILER_EMAIL,
      pass: process.env.EMAILER_PASS,
    },
});
  
const sendEmail = async (email, subject, text) => {
    await transporter.sendMail({
      from: process.env.EMAILER_EMAIL,
      to: email,
      subject: subject,
      text: text,
    });
};

module.exports = sendEmail;