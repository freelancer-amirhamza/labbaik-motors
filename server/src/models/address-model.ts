const mongoose = require("mongoose");


const addressSchema = new mongoose.Schema({
    addressLine: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    state: {
        type: String,
        default: ""
    },
    pinCode: {
        type: String,
    },
    country: {
        type: String,
    },
    phone: {
        type: String,
        default: null,
    },
    status: {
        type: Boolean,
        default: true,
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        default : ""
    }
}, {timestamps: true})


const Address = mongoose.model("address", addressSchema);

module.exports = Address;