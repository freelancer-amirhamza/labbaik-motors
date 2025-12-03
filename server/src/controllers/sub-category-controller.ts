const SubCategory = require("../models/subCategory-model");





const addSubCategory =async (req, res)=>{
    try {
        const {name, image, category} = req.body;
        if(!name && !image && !category){
            return res.status(404).json({
                success: false,
                error: true,
                message:  "Please provide the required field!"
            })
        }
        const payload = {name, image, category};

        const createSubCategory = new SubCategory(payload);
        const newSubCategory = await createSubCategory.save()

        res.status(200).json({
            success:true,
            error: true,
            message: "Sub Category created successfully!",
            data: newSubCategory,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error",
        })
    }
}

const getSubCategory = async (req, res)=>{
    try {
        const getSubCategory = await SubCategory.find().sort({createdAt: -1}).populate("category") ;
        return res.status(200).json({
            success:true,
            error: false,
            message: "Sub category gotten successfully",
            data: getSubCategory,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
}


const updateSubCategory = async (req, res)=>{
    try {
        const {_id, name, image, category} = req.body;
        const checkSubCategory = await SubCategory.findById(_id)
        if(!checkSubCategory){
            return res.status(400).json({
                success:false,
                error: true,
                message: "Invalid ID provided"
            })
        }
        const updateSubCategory = await SubCategory.findByIdAndUpdate(_id, {
                image,
                name,
                category,
        })

        res.status(200).json({
            success: true,
            error: false,
            message : "Sub Category Updated Successfully!",
            data: updateSubCategory,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
}


const deleteSubCategory = async (req,res)=>{
    try {
        const {_id} = req.body;
        const deleteSub = await SubCategory.findByIdAndDelete(_id);

        res.status(200).json({
            success: true,
            error: false,
            message: "This Sub Category Deleted Successfully!",
            data: deleteSub,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "internal server error!",
        })
    }
}

module.exports = {addSubCategory, getSubCategory,updateSubCategory, deleteSubCategory};