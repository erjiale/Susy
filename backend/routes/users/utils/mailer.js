const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");

// Step 1: Set up the Transporter
module.exports = transporter = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
  })
);
