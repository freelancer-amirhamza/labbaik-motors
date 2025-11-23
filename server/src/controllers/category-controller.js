const Category = require("../models/category-model");
const Product = require("../models/product-model");
const SubCategory = require("../models/subCategory-model");

const addCategory = async (req, res) => {
    try {
        const { name, image } = req.body;
        if (!name || !image) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Please provide all required fields"
            })
        }
        const newCategory = new Category({ name, image });
        await newCategory.save();
        if (!newCategory) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Category not created"
            })
        };
        res.status(201).json({
            success: true,
            error: false,
            message: "Category created successfully",
            data: newCategory
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal Server Error"
        })
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await Category.find().sort({name:1});
        if (!category) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "category not found!"
            })
        }
        res.status(200).json({
            success: true,
            error: false,
            message : "category founded!",
            data: category,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "something is wrong"
        })
    }
}

const updateCategory = async (req, res)=>{
    try {
        const {categoryId, name, image}= req.body;
        if(!categoryId || !name || !image){
            res.status(400).json({
                success:false,
                error: true,
                message: "Please Provide the field"
            })
        }
        const category = await Category.findByIdAndUpdate({_id: categoryId},
            {
                name,
                image
            }
        )
        return res.status(200).json({
            success: true,
            error: false,
            message: "The category updated successfully!",
            data: category,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
}

const deleteCategory = async (req, res)=>{
    try {
        const {_id} = req.body;

        if (!_id) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Please provide the category ID"
            });
        }

        const checkSubcategory = await SubCategory.find({
            category :{
                $in : [_id]
            }
        }).countDocuments()

        const checkProduct = await Product.find({
            category: {
                $in : [_id]
            }
        }).countDocuments();

        if(checkSubcategory > 0 || checkProduct > 0){
            return res.status(400).json({
                success:false,
                error: true,
                message: "This category already used, can't deleted the category",
            })
        }


        const deleteCategory = await Category.deleteOne({_id:_id});

        return res.status(200).json({
            success:true,
            error: false,
            message: "The category deleted successfully!",
            data: deleteCategory,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error"
        })
    }
}




module.exports = { addCategory, getCategory, updateCategory, deleteCategory };