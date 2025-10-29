import { createSlice } from "@reduxjs/toolkit";
import { accounts } from "../data/accounts";

const initialState = {
  items: accounts,
  loading: false,
  error: null,
};
const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    //
  },
});

export default accountSlice.reducer;
