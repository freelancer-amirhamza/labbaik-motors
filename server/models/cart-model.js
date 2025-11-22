const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        default: 1,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;