import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import accountReducer from "./accountSlice";
import transactionReducer from "./transactionSlice";

const persistedToken = localStorage.getItem("token");
const persistedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : { firstName: "", lastName: "", userName: "" };

const preloadedState = {
  auth: {
    isAuthenticated: !!persistedToken,
    token: persistedToken,
    user: persistedUser,
  },
};
const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountReducer,
    transactions: transactionReducer,
  },
  preloadedState,
});

export default store;
