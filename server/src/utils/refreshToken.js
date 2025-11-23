const jwt = require("jsonwebtoken");
const UserModal = require("../models/user-model");
require("dotenv").config();

const generateRefreshToken = async (userId) => {
    const token = await jwt.sign(
        { id: userId },
        process.env.SECRET_KEY_REFRESH_TOKEN,
        { expiresIn: "7d" }
    );

    const updateUserRefreshToken = await UserModal.updateOne(
        { _id: userId },
        { refresh_token: token }
    );

    return token;
}

module.exports = generateRefreshToken;