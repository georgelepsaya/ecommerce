import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCurrenciesBackdrop: false,
};

const currenciesBackdropSlice = createSlice({
  name: "currenciesBackdrop",
  initialState,
  reducers: {
    toggleCurrenciesModal: (state) => {
      state.showCurrenciesBackdrop = !state.showCurrenciesBackdrop;
    },
  },
});

export const { toggleCurrenciesModal } = currenciesBackdropSlice.actions;
export default currenciesBackdropSlice.reducer;
