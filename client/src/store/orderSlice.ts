import {createSlice} from "@reduxjs/toolkit";


const initialValue = {
    orderList: [],
}


const orderSlice = createSlice({
    name: "orderSlice",
    initialState: initialValue,
    reducers:{
        handleOrderSlice : (state, action)=>{
            state.orderList= [...action.payload]
        }
    }
})

export const {handleOrderSlice} = orderSlice.actions;
export default orderSlice.reducer;