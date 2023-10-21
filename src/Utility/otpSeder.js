const nodemailer = require("nodemailer");



const otpSender = async(emailTo,emailText,emailSubject)=>{
    const transporter = nodemailer.createTransport({
        host: "mail.teamrabbil.com",
        port: 25,
        secure: false,
        auth: {
            user: 'info@teamrabbil.com',
            pass: '~sR4[bhaC[Qs'
          },
          tls:{
            rejectUnauthorized:false
          }
      });

    const option = {
        from:'Task manager mern batch_4 <info@teamrabbil.com>',
        to:emailTo,
        Subject:emailSubject,
        Text:emailText
    } 


   return await transporter.sendMail(option)

}

module.exports = otpSender