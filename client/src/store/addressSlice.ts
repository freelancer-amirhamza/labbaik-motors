import  {createSlice } from "@reduxjs/toolkit";


const initialValue = {
    addressList : [],
}

const addressSlice = createSlice({
    name: "addressSlice",
    initialState: initialValue,
    reducers: {
        handleAddressSlice : (state, action)=>{
            state.addressList = [...action.payload]
        }
    }
})


export const {handleAddressSlice} = addressSlice.actions;

export default addressSlice.reducer;


