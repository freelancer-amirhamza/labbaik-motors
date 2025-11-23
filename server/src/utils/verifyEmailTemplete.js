const verifyEmailTemplate = ({name, url})=>{
    return`
    <h2>Dear ${name}!</h2>
    <p>Thank you for registering HutBazar.</p>
    <p>Please click for verify your email.</p>
    <a href=${url} style="color:white; background:green; padding: 5px 10px; margin-top: 10px; border-radius: 10px; " >
    Verify Email</a>
    `
}

module.exports = verifyEmailTemplate;