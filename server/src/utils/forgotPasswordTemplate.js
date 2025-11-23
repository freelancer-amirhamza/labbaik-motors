const forgotPasswordTemplate = ({name, otp})=>{
    return `
    <div>
    <h2>Dear ${name}!</h2>
    <h5>You are requested a password reset,
    Please following OTP code to reset your password</h5>

    <h4 style="background: #81f3c3; font-size: 20px; padding: 20px;
    text-align: center; font-weight: 800 "> ${otp} </h4>
    <p>This OTP is valid for 10 minutes only. Enter this OTP in the hut bazaar website
    to proceed with resetting your password. </p>
    <p>Thanks</p>
    <p>Hut Bazaar</p>
    </div>
    `
}

module.exports = forgotPasswordTemplate;