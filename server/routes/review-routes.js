const express = require("express");
const { addProductReview, getAllReviews } = require("../controllers/review-controllers");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/add-review",auth, addProductReview );
router.post("/get-review", getAllReviews)



module.exports = router;