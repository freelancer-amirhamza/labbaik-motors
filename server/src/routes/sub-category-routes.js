const express = require("express");
const auth = require("../middleware/auth");
const { addSubCategory, getSubCategory, updateSubCategory, deleteSubCategory } = require("../controllers/sub-category-controller");
const router = express.Router();


router.post("/create", auth, addSubCategory);
router.post("/get", getSubCategory);
router.put("/update", auth, updateSubCategory)
router.delete("/delete", auth, deleteSubCategory);


module.exports = router;