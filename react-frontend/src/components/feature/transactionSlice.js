import { createSlice } from "@reduxjs/toolkit"
import { transactions } from "../../data/transactions"

const initialState = {
  items: transactions,
  loading: false,
  error: null,
};


//Create slice for transactions
const transactionSlice =createSlice( {
  name : "transactions",
  initialState,

  reducers:{
    updateTransactionLocally: (state, action) => {
      const { id, updates } = action.payload;
      state.items = state.items.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      );
    },
  },
});


export const { updateTransactionLocally } = transactionSlice.actions
export default transactionSlice.reducer;