import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || {
    firstName: "",
    lastName: "",
    userName: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set authentication and token when login succeeds
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      if (action.payload.user) {
        state.user = action.payload.user;
      }
    },
    // Clear all data when user logs out
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = { firstName: "", lastName: "", userName: "" };

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    // Update user profile info
    setUserInfo: (state, action) => {
      if (action.payload.firstName !== undefined) {
        state.user.firstName = action.payload.firstName;
      }
      if (action.payload.lastName !== undefined) {
        state.user.lastName = action.payload.lastName;
      }
      if (action.payload.userName !== undefined) {
        state.user.userName = action.payload.userName;
      }
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});
export const { loginSuccess, logout, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
