import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
}

console.log("@reducer redux-toolkit")

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

    loginSuccess: (state,action) => {
        state.user = action.payload,
        state.isAuthenticated = true,
        localStorage.setItem("userData",JSON.stringify(action.payload));
    },
    
    logout: (state) => {
      state.user = null,
      state.isAuthenticated = false
      localStorage.clear();
    },
  },
});

export const {loginSuccess, logout } = counterSlice.actions

export default counterSlice.reducer;

