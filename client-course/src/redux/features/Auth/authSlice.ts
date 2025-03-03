import { AuthState } from "@/interface";
import { createSlice } from "@reduxjs/toolkit";



const initialState: AuthState = {
    token: null
};

const authReducer = createSlice( {
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.accessToken
        },
        logout: (state) =>{
            state.token = null
        }
    }
})

export const { setToken, logout } = authReducer.actions;
export default authReducer.reducer;
