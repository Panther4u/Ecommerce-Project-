// cartSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { clearOrderedProducts } from './orderSlice'; // Import clearOrderedProducts from orderSlice

const initialState = {
  products: [], // Initial state of cart products
  couponDiscount: 0, // Initial state of coupon discount
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(item => item.id !== action.payload.id);
    },
    applyCoupon: (state, action) => {
      state.couponDiscount = action.payload;
    },
    clearCart: (state) => {
      state.products = [];
      state.couponDiscount = 0;
      clearOrderedProducts(state); // Clear ordered products in orderSlice as well
    },
    setOrderedProducts: (state) => {
      state.products = []; // Clear cart products upon placing order
      state.couponDiscount = 0; // Reset coupon discount upon placing order
      // No need to set orderedProducts here directly, handle that in orderSlice
    },
  },
});

export const { addToCart, removeFromCart, applyCoupon, clearCart, setOrderedProducts } = cartSlice.actions;
export default cartSlice.reducer;
