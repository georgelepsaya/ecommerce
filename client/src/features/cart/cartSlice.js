import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    newCartItem: (state, action) => {
      let isInCart = false;
      let existingItem = {};
      state.cartItems.forEach((item) => {
        if (
          JSON.stringify(item.id) ===
            JSON.stringify(action.payload.product.id) &&
          JSON.stringify(item.attributes) ===
            JSON.stringify(action.payload.product.attributes)
        ) {
          isInCart = true;
          existingItem = item;
        }
      });
      if (!isInCart) {
        state.cartItems.push(action.payload.product);
      } else {
        existingItem.amount += 1;
      }
    },
    removeItem: (state, action) => {
      state.cartItems.forEach((item) => {
        if (JSON.stringify(item) === JSON.stringify(action.payload)) {
          state.cartItems = state.cartItems.filter((pr) => pr !== item);
        }
      });
    },
    calculateTotals: (state, action) => {
      const curr = action.payload;
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total +=
          item.amount *
          item.prices.find((price) => price.currency.label === curr.label)
            .amount;
      });
      state.amount = amount;
      state.total = total;
    },
    increase: (state, { payload }) => {
      state.cartItems.forEach((item) => {
        if (JSON.stringify(item) === JSON.stringify(payload)) {
          item.amount += 1;
        }
      });
    },
    decrease: (state, { payload }) => {
      state.cartItems.forEach((item) => {
        if (JSON.stringify(item) === JSON.stringify(payload)) {
          item.amount -= 1;
        }
      });
    },
  },
});

export const {
  newCartItem,
  calculateTotals,
  increase,
  decrease,
  removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;
