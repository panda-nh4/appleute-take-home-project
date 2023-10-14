import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : {items:[]},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateLocalCart: (state, action) => {
      state.cartItems = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(action.payload));
    },
  },
});

export const { updateLocalCart } = cartSlice.actions;
export default cartSlice.reducer;
