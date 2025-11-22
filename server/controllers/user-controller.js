const sendEmail = require("../config/sendEmail");
const User = require("../models/user-model");
const bcryptjs = require("bcryptjs");
const verifyEmailTemplate = require("../utils/verifyEmailTemplete");
const generateRefreshToken = require("../utils/refreshToken");
const generateAccessToken = require("../utils/accessToken");
const UserModal = require("../models/user-model");
const uploadImageCloudinary = require("../config/cloudinary");
const generateOtp = require("../utils/generateOtp");
const forgotPasswordTemplate = require("../utils/forgotPasswordTemplate");
const jwt = require("jsonwebtoken");
require("dotenv").config()


const registerUser = async (req, res) => {
    try {
        console.log(req.body, "test api")
        const { name, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "please provide name email password",
            })
        };

        const user = await User.findOne({ email });
        if (user) {
            return res.json({
                success: false,
                error: true,
                message: "This user already exited"
            })
        };

        const salt = await bcryptjs.genSalt(10);

        const hashPassword = await bcryptjs.hash(password, salt);

        const payload = {
            name,
            email,
            password: hashPassword,
        };

        const newUser = new User(payload);

        await newUser.save();
        const VerifyEmailUrl = `${process.env.CLIENT_URL}/verify-email?code=${newUser?._id}`

        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify email from HutBazar",
            html: verifyEmailTemplate({
                name,
                url: VerifyEmailUrl,
            })
        })


        res.status(200).json({
            success: true,
            error: false,
            message: "The user registered successfully!",
            data: verifyEmail,
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message,
        })
    }
};
const verifyEmail = async (req, res) => {
    try {
        const { code } = req.body;

        const user = await User.findOne({ _id: code });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Invalid code entered!"
            })
        }

        const updateUser = await User.updateOne({ _id: code }, { verify_email: true });

        res.status(200).json({
            success: true,
            error: false,
            message: "the email verified successfully!",
            data: updateUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message,
        })
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Please provide email and password!"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "The user is not found!"
            })
        }

        if (user.status !== "Active") {
            return res.status(400).json({
                success: false,
                error: true,
                message: "This User is not active, Please Contact to Admin"
            })
        }
        const checkPassword = await bcryptjs.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Incorrect Password, Please check your password!"
            })
        };

        const refreshToken = await generateRefreshToken(user._id);
        const accessToken = await generateAccessToken(user._id);
        const updateUser = await UserModal.findByIdAndUpdate(user._id, {
            last_login_date: new Date()
        })

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        };

        res.cookie("accessToken", accessToken, cookiesOption);
        res.cookie("refreshToken", refreshToken, cookiesOption);

        return res.status(200).json({
            success: true,
            error: false,
            message: "The user login successfully!",
            data: {
                accessToken,
                refreshToken,
            }
        })
    } catch (error) {
        return res.status({})
    }
}


// LOGOUT USER

const logoutUser = async (req, res) => {
    const userId = req.userId;
    try {
        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        };

        res.clearCookie("accessToken", cookiesOption);
        res.clearCookie("refreshToken", cookiesOption);

        const removeRefreshToken = await UserModal.findByIdAndUpdate(userId, {
            refresh_token: ""
        })
        return res.status(200).json({
            success: true,
            error: false,
            message: "The user logout successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}


// upload avatar 

const uploadAvatar = async (req, res) => {
    try {
        const image = req.file; // multer middleware
        const userId = req.userId; // auth middleware

        const upload = await uploadImageCloudinary(image);

        const updateUser = await UserModal.findByIdAndUpdate({ _id: userId }, {
            avatar: upload?.url,
        })
        res.status(201).json({
            success: true,
            error: false,
            message: "User avatar uploaded successfully!",
            data: {
                _id: userId,
                avatar: upload.url
            }
        })

        console.log(upload, "image")
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "something is wrong!",
        })
    }
}

// update user details

const updateUserDetails = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, email, mobile, password } = req.body;

        let hashPassword = "";

        if (password) {
            const salt = await bcryptjs.genSalt(10);
            hashPassword = await bcryptjs.hash(password, salt);
        }

        const updateUser = await UserModal.updateOne({ _id: userId }, {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(mobile && { mobile: mobile }),
            ...(password && { password: hashPassword })
        })

        res.status(200).json({
            success: true,
            error: false,
            message: "The user details updated successfully!",
            data: updateUser,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "something is wrong!"
        })
    }
}


// forgot password

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await UserModal.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "This email is not available!"
            })
        }

        const otp = generateOtp()
        const expireTime = new Date() + 60 * 60 * 1000;

        const updateUser = await UserModal.findByIdAndUpdate(user._id, {
            forgot_password_otp: otp,
            forgot_password_expire: new Date(expireTime).toDateString()
        })

        await sendEmail({
            sendTo: email,
            subject: "forgot password from hutBazaar",
            html: forgotPasswordTemplate({
                name: user?.name,
                otp: otp
            })

        })

        return res.status(201).json({
            success: true,
            error: false,
            message: "The OTP has been sent, please check your email!",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "something is wrong!"
        })
    }
}

// verify otp for password reset

const verifyForgotPasswordOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Please provide the required field email or otp"
            })
        }

        const user = await UserModal.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "this email is not available, please try again!"
            })
        }

        const currentTime = new Date().toDateString();
        if (user.forgot_password_expire < currentTime) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "This OTP is expired"
            })
        };

        if (otp !== user.forgot_password_otp) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid OTP, Please Try Again!"
            })
        };

        const updateUser = await UserModal.findByIdAndUpdate(user._id, {
            forgot_password_otp: "",
            forgot_password_expire: ""
        })


        res.status(200).json({
            success: true,
            error: false,
            message: "The OTP verified successfully!"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "something is wrong!",
        })
    }
}

// reset password 
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;
        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Please provide the email, newPassword and confirmPassword"
            })
        }

        const user = await UserModal.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "The email is not available"
            })
        }

        if (newPassword !== confirmPassword) {
            return res.status(500).json({
                success: false,
                error: true,
                message: "new password and confirm password are must be same!"
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(newPassword, salt);

        const updatePassword = await UserModal.findByIdAndUpdate(user._id, {
            password: hashPassword
        })

        res.status(200).json({
            success: true,
            error: false,
            message: "The password updated successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "something is wrong",
        })
    }
}


const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken ||
            req?.headers?.authorization?.split(" ")[1];

        if (!refreshToken) {
            return res.status(500).json({
                success: false,
                error: true,
                message: "Invalid token!"
            })
        }
        
        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
        if(!verifyToken){
            return res.status(400).json({
                success: false,
                error: true,
                message: "token is expired"
            })
        }

        const userId = verifyToken._id;

        const newAccessToken = await generateAccessToken(userId)
        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        }

        res.cookie('accessToken',newAccessToken,cookiesOption)

        return res.status(200).json({
            success:true,
            error: false,
            message: "New access token generated successfully!",
            data: {
                accessToken: newAccessToken,
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "something is wrong!"
        })
    }
};

const getUserDetails = async (req, res) => {
    try {
        const userId = req.userId;

        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "User ID is missing in the request.",
            });
        }

        // Fetch user details from the database
        const user = await UserModal.findById(userId).select('-password -refresh_token');

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "User not found.",
            });
        }

        // Return user details
        return res.status(200).json({
            success: true,
            error: false,
            message: "User found successfully.",
            data: user,
        });
    } catch (error) {
        // Handle unexpected errors
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error.",
        });
    }
};
module.exports = {
    registerUser,
    verifyEmail,
    loginUser, logoutUser,
    uploadAvatar, updateUserDetails,
    forgotPassword,
    resetPassword,
    verifyForgotPasswordOtp,
    refreshToken,
    getUserDetails
};