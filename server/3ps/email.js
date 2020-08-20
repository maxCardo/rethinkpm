const sgMail = require('@sendGrid/mail') 
const nodemailer = require('nodemailer');
const {smtpAcct, smtpPass, testEmail, sendGridKey} = require('./../config/creds')
const { availabilityLink } = require('./calandly');

sgMail.setApiKey(sendGridKey);

let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
        user: smtpAcct,
        pass: smtpPass
    }
});


const sendEmail = (to, subject, body, html) => {
    let sendTo;
    process.env.NODE_ENV === 'production' ? (sendTo = to) : (sendTo = testEmail)
    let mailOptions = {
        from: 'no-reply@fifthgrant.com',
        to: sendTo,
        subject: subject,
        text: body,
        html: html
    };


    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent', info);
        }
    })
};


const sendFirstEmail = (email, listing) => {
    const subject = `Thank you for your interest in ${listing}.`
    const templet = `Thank you for your interest in ${listing}. Would you like to schedual a time to see the place?
    \nPlease use the link below to check our availbility and schedual.\n${availabilityLink[listing]}`

    const html = `<p>Thanks for your interest in ${listing}. <br>
        If you have any questions about the place, please feel free to contact me directly via text at 412-444-7505 or at this email <br><br>

        You can also use the link below to check our availability and schedule a tour of the property. <br><br>

        <a href="${availabilityLink[listing]}">Click Here</a>
    </p>`




    sendEmail(email,subject,templet,html);
}

const sendGridEmail = (to, subject, text, html) => {

    const msg = {
        to,
        from: 'adamp@fifthgrant.com',
        subject,
        text,
        html,
    };
    sgMail.send(msg);    
    
}


module.exports = { sendEmail, sendFirstEmail };
