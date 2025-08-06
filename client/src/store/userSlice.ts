import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUserDetails: (state, action)=>{
            state.user = action.payload
        },
        updatedAvatar: (state, action)=>{
            state.user.avatar = action.payload
        },

        logout: (state)=>{
            state.user = null
        }
    }
})

export const { setUserDetails, logout,updatedAvatar } = userSlice.actions;

export default userSlice.reducer