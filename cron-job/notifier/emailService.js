const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({
    service: "gmail",
    debug: true,
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'aradhyagupta445@gmail.com',
        pass: 'mtmydtybhhqclylt'
    },
   secure: false
})