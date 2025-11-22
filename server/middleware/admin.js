const UserModal = require("../models/user-model");

const admin = async(req, res, next)=>{
    try {
        const userId  = req.userId;
        const user = await UserModal.findById(userId);
        if( user.role !== "admin"){
            return res.status(403).json({
                success:false,
                error: true,
                message: "You are not authorized to access this resource"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            error: true,
            message: error.message || "Internal Server Error"
        })
    }
}

module.exports = admin;