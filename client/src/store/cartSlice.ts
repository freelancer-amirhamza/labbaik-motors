import {createSlice} from "@reduxjs/toolkit";


const initialState={
    cart: [],
}

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        setCartItems: (state, action)=>{
            state.cart= [...action.payload]
        }
    }
})

export const {setCartItems} = cartSlice.actions;

export default cartSlice.reducer;