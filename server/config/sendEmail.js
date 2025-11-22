const { Resend } = require("resend");
require("dotenv").config();


if(!process.env.RESEND_API_KEY){
    return console.log("Please Provide new RESEND_API_KEY in side .env file");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async({sendTo, subject, html})=>{
    try {
        const { data, error } = await resend.emails.send({
        from: 'HutBazaar  <onboarding@resend.dev>',
        to: sendTo,
        subject: subject,
        html: html,
    })
    if(error){
        return console.error({error});
    };
    return data;

    } catch (error) {
        console.log(error.mgs)
    }
}

module.exports = sendEmail;