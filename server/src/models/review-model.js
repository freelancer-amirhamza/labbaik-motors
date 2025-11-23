const mongoose = require("mongoose");


const ProductReviewSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    productId: {
        type:mongoose.Schema.ObjectId,
        ref: "Product"
    },
    userName: {
        type: String,
        default: ""
    },
    reviewMessage: {
        type: String,
        default: "",
    },
    reviewValue: {
        type: Number,
        default:"",
    }
},{timestamps:true});


const ProductReview = mongoose.model("ProductReview", ProductReviewSchema);

module.exports = ProductReview;