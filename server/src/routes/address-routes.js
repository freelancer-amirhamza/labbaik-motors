const express = require("express");
const auth = require("../middleware/auth");
const { addAddress, getAddress, updateAddress, deleteAddress } = require("../controllers/address-controllers");
const router = express.Router();


router.post("/create", auth, addAddress);
router.get("/get", auth, getAddress);
router.put("/update",auth, updateAddress);
router.delete("/delete",auth, deleteAddress);   


module.exports = router;