// // orderSlice.js

// import { createSlice } from '@reduxjs/toolkit';

// const orderSlice = createSlice({
//   name: 'order',
//   initialState: {
//     orderedProducts: [], // Array to store ordered products
//     savedOrders: [], // Array to store manually saved orders
//   },
//   reducers: {
//     setOrderedProducts: (state, action) => {
//       state.orderedProducts = action.payload;
//     },
//     saveOrder: (state, action) => {
//       state.savedOrders.push(action.payload);
//     },
//     clearOrderedProducts: (state) => {
//       state.orderedProducts = [];
//     },
//   },
// });

// export const { setOrderedProducts, saveOrder, clearOrderedProducts } = orderSlice.actions;

// export default orderSlice.reducer;




import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderedProducts: JSON.parse(localStorage.getItem('orderedProducts')) || [], // Initialize from localStorage
    savedOrders: [], // Array to store manually saved orders
  },
  reducers: {
    setOrderedProducts: (state, action) => {
      state.orderedProducts = action.payload;
      localStorage.setItem('orderedProducts', JSON.stringify(state.orderedProducts)); // Save to localStorage
    },
    saveOrder: (state, action) => {
      state.savedOrders.push(action.payload);
    },
    clearOrderedProducts: (state) => {
      state.orderedProducts = [];
      localStorage.removeItem('orderedProducts'); // Remove from localStorage
    },
  },
});

// Async action to save order to backend
export const saveOrderAsync = (orderedProducts) => async (dispatch, getState) => {
  try {
    const { auth } = getState(); // Assuming auth state includes userId after login
    const { userId } = auth; // Get userId from auth state

    // Example API call to save order
    await axios.post('http://localhost:8000/api/orders', { userId, orderedProducts });

    dispatch(setOrderedProducts(orderedProducts));
  } catch (error) {
    console.error('Error saving order:', error);
    // Handle error scenario
  }
};

export const { setOrderedProducts, saveOrder, clearOrderedProducts } = orderSlice.actions;

export default orderSlice.reducer;
