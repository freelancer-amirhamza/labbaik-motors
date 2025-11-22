const uploadImageCloudinary = require("../config/cloudinary");


const uploadImage = async(req, res)=>{
    try {
        const file = req.file;
        console.log(file, "url")
        const uploadImage = await uploadImageCloudinary(file)
        return res.json({
            success: true,
            error: false,
            message: "Image uploaded",
            data: uploadImage,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error:true,
            message: error.message || "Internal Server"
        })
    }
}


module.exports = uploadImage;