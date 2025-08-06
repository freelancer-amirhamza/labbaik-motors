import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productSlice from "./productSlice";
import cartReducer from "./cartSlice.js";
import addressReducer from "./addressSlice.js";
import orderSlice from "./orderSlice.js";
import reviewSlice from "./reviewSlice.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productSlice,
        cartItems: cartReducer,
        address: addressReducer,
        orders: orderSlice,
        reviewSlice,
    }
});