const express = require("express");
const router = express.Router();
const { addProduct, getProduct, getProductByCategory, getProductByCategoryAndSubCategory, getProductDetails, updateProduct, deleteProduct, searchProduct } = require("../controllers/product-controllers.js");
const auth = require("../middleware/auth.js");
const admin = require("../middleware/admin.js");

router.post("/create", auth,admin, addProduct);
router.post("/get", getProduct);
router.post("/get-product-by-category", getProductByCategory);
router.post("/get-product-by-category-and-sub-category", getProductByCategoryAndSubCategory);
router.post("/get-product-details", getProductDetails);
router.put("/update-product", auth, admin, updateProduct);
router.delete("/delete-product",auth,admin, deleteProduct);
router.post("/search-product", searchProduct);



module.exports = router;