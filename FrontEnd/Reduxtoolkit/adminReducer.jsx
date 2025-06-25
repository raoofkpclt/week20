 import { createSlice } from "@reduxjs/toolkit";

 const initialState = {
    admin:null,
    isAuthenticated :false
 }

const adminSlice = createSlice({
    name:"adminSlice",
    initialState,
    reducers : {
        adminLoginSuccess:(state,action)=>{
            state.admin = action.payload,
            state.isAuthenticated = true
            
            localStorage.setItem("adminData",JSON.stringify("admin logged successfully"));
        },
        logout :(state)=>{
            state.admin = "",
            state.isAuthenticated = false;

            localStorage.removeItem("adminData");
        }
    }
 })

 export const {adminLoginSuccess,logout} = adminSlice.actions;

 export default adminSlice.reducer;