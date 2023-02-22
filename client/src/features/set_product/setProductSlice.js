import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
};

const setProductSlice = createSlice({
  name: "set_product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      const product = action.payload;
      state.product = product;
    },
    selectItem: (state, action) => {
      for (const key in state.product) {
        if (Object.hasOwnProperty.call(state.product, key)) {
          if (key === "attributes") {
            for (const set of state.product[key]) {
              for (const item of set["items"]) {
                if (set.name === action.payload.name) {
                  item.isSelected = false;
                }
                if (
                  item.id === action.payload.id &&
                  set.name === action.payload.name
                ) {
                  item.isSelected = !item.isSelected;
                }
              }
            }
          }
        }
      }
    },
  },
});

export const { setProduct, selectItem } = setProductSlice.actions;

export default setProductSlice.reducer;
