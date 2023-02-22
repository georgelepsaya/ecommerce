import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: "all",
};

const setPageSlice = createSlice({
  name: "set_page",
  initialState,
  reducers: {
    updatePage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { updatePage } = setPageSlice.actions;

export default setPageSlice.reducer;
