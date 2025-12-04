const express = require("express");
const { addToCartItem, getCartItems, updateCartItem, deleteCartItem } = require("../controllers/cart-controllers");
const auth = require("../middleware/auth");
const router = express.Router();

// add cart items
router.post("/create", auth, addToCartItem);
// get cart items
router.get("/get-carts", auth, getCartItems);
// update cart items 
router.put("/update-cart", auth, updateCartItem);
// delete cart items 
router.delete("/delete-cart",auth,deleteCartItem)




module.exports = router;