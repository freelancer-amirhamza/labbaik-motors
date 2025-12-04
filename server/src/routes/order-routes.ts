const express = require("express");
const auth = require("../middleware/auth");
const {
    cashOnDeliveryOrder,
    getOrderDetails,
    getAdminOrdersDetails,
    deleteAdminOrder,
    updateAdminOrder,
    onlinePaymentOrder,
    handleSuccess,
    handleFail,
    handleCancel,
} = require("../controllers/order-controllers");
const admin = require("../middleware/admin");
const router = express.Router();

router.post("/cash-on-delivery", auth, cashOnDeliveryOrder);
router.get("/get-order-details", auth, getOrderDetails);
router.get("/get-admin-orders-details", auth, admin, getAdminOrdersDetails);
router.put("/update-admin-order", auth, admin, updateAdminOrder);
router.delete("/delete-admin-order", auth, admin, deleteAdminOrder);
router.post("/online-payment", auth, onlinePaymentOrder);
router.post("/payment-success",  handleSuccess);
router.post("/payment-fail",  handleFail);
router.post("/payment-cancel",  handleCancel);
module.exports = router;
