
const Order = require("../models/order-model");
const Product = require("../models/product-model");
const ProductReview = require("../models/review-model");


const addProductReview = async(req,res)=>{
    try {
        const userId = req.userId;
        const {productId, userName, reviewMessage, reviewValue} = req.body;

        const order = await Order.findOne({
            userId: userId,
            "products.productId" : productId,
            "order_status": "confirmed" || "deliverid",
        })
        if(!order){
            return res.status(404).json({
                success:false,
                error:true,
                message: "You have to pursess the product to give review!"
            })
        }
        const checkExitingReview = await ProductReview.findOne({productId, userId})
        if(checkExitingReview){
            return res.status(403).json({
                success:false,
                error:true,
                message:"Already You have given review!",
            })
        };

        const newReview = new ProductReview({
            userId,
            userName,
            productId,
            reviewMessage,
            reviewValue,
        });

        await newReview.save();

        const review = await ProductReview.find({productId});
        const totalReviewLength = review.length;
        const averageReview = review.reduce((sum , reviewItem)=> sum + reviewItem.reviewValue, 0) / totalReviewLength;
        
        await Product.findByIdAndUpdate(productId, {averageReview});
        res.status(200).json({
            success: true,
            message: "Your review have been added successfully!",
            data: newReview, 
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error: true,
            message:error.messages || "Internal server error!"
        })
    }
} 


// get review 

const getAllReviews = async (req, res) => {
    try {
         const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Product ID is required!",
            });
        }

        const reviews = await ProductReview.find({ productId: productId });

        if (!reviews) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "No reviews found for this product!",  
            });
        }

        return res.status(200).json({
            success: true,
            error: false,
            message: "Reviews fetched successfully!",
            data: reviews,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!",
        });
    }
};



module.exports = {addProductReview,getAllReviews}