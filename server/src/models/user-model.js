const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
    },
    avatar: {
        type: String,
        default:""
    },
    mobile:{
        type: Number,
        default: null
    },
    refresh_token:{
        type: String,
        default: "",
    },
    verify_email:{
        type: Boolean,
        default: false,
    },
    last_login_date:{
        type: Date,
        default: "",
    },
    status:{
        type: String,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active",
    },
    address_details:[
        {
            type: mongoose.Schema.ObjectId,
            ref: "address",
        }
    ],
    shopping_cart: [{
        type: mongoose.Schema.ObjectId,
        ref: "Cart",
    }],
    orderHistory: [{
        type: mongoose.Schema.ObjectId,
        ref: "Order",
    }],
    forgot_password_otp: {
        type:String,
        default: null
    },
    forgot_password_expire: {
        type: Date,
        default:"",
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
},{timestamps:true})

const UserModal = mongoose.model("User", userSchema);

module.exports = UserModal;