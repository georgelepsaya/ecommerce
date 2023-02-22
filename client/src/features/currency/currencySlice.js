import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: {
    label: "USD",
    symbol: "$",
  },
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    updateCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { updateCurrency } = currencySlice.actions;

export default currencySlice.reducer;
