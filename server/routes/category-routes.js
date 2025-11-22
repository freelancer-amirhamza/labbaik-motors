const express = require("express");
const auth = require("../middleware/auth");
const { addCategory, getCategory, updateCategory, deleteCategory } = require("../controllers/category-controller");

const router = express.Router();


router.post("/add-category", auth, addCategory);
router.get("/get-category", getCategory);
router.put("/update-category", auth, updateCategory);
router.delete("/delete-category", auth, deleteCategory);

module.exports = router;