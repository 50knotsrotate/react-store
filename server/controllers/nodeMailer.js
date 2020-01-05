const nodemailer = require("nodemailer");
const { welcome } = require("./mailerconstants");

var transporter;

var mailOptions = {
  from: null,
  to: null,
  subject: "Welcome!!!",
  text: welcome
};

module.exports = {
  init: function(email, password) {
    mailOptions.from = email;

    transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      requireTLS: true,
      auth: {
        user: email,
        pass: password
      }
    });
  },
  sendEmail: function(email, message) {
    mailOptions.to = email;
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
};
