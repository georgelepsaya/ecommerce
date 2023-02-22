import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showMinicartBackdrop: false,
};

const minicartBackdropSlice = createSlice({
  name: "minicartBackdrop",
  initialState,
  reducers: {
    toggleMinicartModal: (state) => {
      state.showMinicartBackdrop = !state.showMinicartBackdrop;
    },
  },
});

export const { toggleMinicartModal } = minicartBackdropSlice.actions;
export default minicartBackdropSlice.reducer;
