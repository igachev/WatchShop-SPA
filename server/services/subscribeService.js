const nodemailer = require('nodemailer')

const subject = 'Welcome to WatchShop!'
const message = 'Thanks for your subscription.Each week you will receive our newsletter on this email address.'

exports.sendEmail = async (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
    if(!regex.test(email)) {
        throw new Error('Invalid Email')
    }
    let transporter = nodemailer.createTransport({
       // service: 'gmail',
        host: "smtp.abv.bg",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SUBSCRIPTION_EMAIL, 
            pass: process.env.SUBSCRIPTION_EMAIL_PASSWORD
        },
        tls:{
          rejectUnauthorized:false
        }
    });

     await transporter.sendMail({
        from: process.env.SUBSCRIPTION_EMAIL,
        to:email,
        subject,
        text: message
    });
}