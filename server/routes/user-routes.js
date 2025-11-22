const express = require("express");
const { registerUser, verifyEmail, loginUser, logoutUser, uploadAvatar, updateUserDetails, forgotPassword, verifyForgotPasswordOtp, resetPassword, refreshToken, getUserDetails } = require("../controllers/user-controller.js");
const auth = require("../middleware/auth.js");
const upload = require("../middleware/multer.js");

const router = express.Router();


router.post("/register", registerUser);
router.put("/verify-email", verifyEmail);
router.post("/login", loginUser);  
router.get("/logout", auth, logoutUser);
router.put("/upload-image", auth, upload.single("avatar"), uploadAvatar);
router.put("/update-user", auth, updateUserDetails);
router.put("/forgot-password", forgotPassword);
router.put("/verify-forgot-password-otp", verifyForgotPasswordOtp),
router.put("/reset-password", resetPassword)
router.post("/refresh-token", refreshToken)
router.get("/user-details",auth, getUserDetails);

module.exports = router;