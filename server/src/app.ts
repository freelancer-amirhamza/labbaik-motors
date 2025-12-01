const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
require('./config/database.js');
const userRouter = require("./routes/user-routes.js");
const categoryRouter = require("./routes/category-routes.js")
const uploadImageRouter = require("./routes/uploadImage-routes.js")
const subCategoryRouter = require("./routes/sub-category-routes.js");
const productRouter = require("./routes/product-routes.js");
const cartRouter = require("./routes/cart-routes.js");
const addressRouter = require("./routes/address-routes.js");
const orderRouter = require("./routes/order-routes.js");
const reviewRouter = require("./routes/review-routes.js");





app.use(cors({
    credentials : true,
    origin : process.env.CLIENT_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}));



app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/file", uploadImageRouter);
app.use("/api/sub-category", subCategoryRouter);
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order",orderRouter);
app.use("/api/review", reviewRouter)

module.exports = app;