import { AuthState } from "@/interface";
import { createSlice } from "@reduxjs/toolkit";



const initialState: AuthState = {
    token: ""
};

const authReducer = createSlice( {
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            const {accessToken} = action.payload;
            state.token = accessToken;
        },
        logout: (state) =>{
            state.token = ""
        }
    }
})

export const { setToken, logout } = authReducer.actions;
export default authReducer.reducer;
