const nodemailer = require("nodemailer");
const promisify = require("es6-promisify");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

exports.send = async options => {
  const mailOptions = {
    from: `Kyle Bonar <noreply@dangthatsdelicious.com>`,
    to: options.user.email,
    subject: options.subject,
    html: "temp",
    text: "temp"
  };
  const sendMail = promisify(transport.sendMail, transport);
  return sendMail(mailOptions);
};
