const nodemailer = require("nodemailer");
const jsonfile = require('jsonfile')

/*
for some reason jsonfile cant read these files
const config = jsonfile.readFileSync('../config/mail.json')
const {domain} = jsonfile.readFileSync('../config/general.json')
*/
async function main() {

  let transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure, // true for 465, false for other ports
    auth: {
      user: config.username,
      pass: config.password,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Esi-Hub" ' + config.email, //
    to: receiverEmail, 
    subject: "Verify Your account", 
    text: `Your email verification link : http://${domain}/verifyAccount/${token}`, 
    html: `Your email verification link : <b>http://${domain}/verifyAccount/${token}</b>`,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

module.exports = (receiverEmail, token) => {
  main.catch(console.error)
}