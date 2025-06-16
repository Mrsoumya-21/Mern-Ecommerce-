const nodemailer = require("nodemailer");

function generateOTP(length = 6) {
  return Math.floor(100000 + Math.random() * 900000)
    .toString()
    .substring(0, length);
}

async function sendOTPEmail(email, otp) {
  // Configure your email transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail", // or your email provider
    auth: {
      user: process.env.EMAIL_USER, // set in .env
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { generateOTP, sendOTPEmail };
