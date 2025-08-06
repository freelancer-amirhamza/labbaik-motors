import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    reviews: null,
}

const reviewSlice = createSlice({
    name: "userSlice",
    initialState: initialState,
    reducers: {
        setReviewSlice: (state,action)=>{
            state.reviews = [...action.payload]
        }
    }
})


export const {setReviewSlice} = reviewSlice.actions;
export default reviewSlice.reducer;