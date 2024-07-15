// // cartSlice.js

// import { createSlice } from '@reduxjs/toolkit';
// import { clearOrderedProducts } from './orderSlice'; // Import clearOrderedProducts from orderSlice

// const initialState = {
//   products: [], // Initial state of cart products
//   couponDiscount: 0, // Initial state of coupon discount
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       state.products.push(action.payload);
//     },
//     removeFromCart: (state, action) => {
//       state.products = state.products.filter(item => item.id !== action.payload.id);
//     },
//     applyCoupon: (state, action) => {
//       state.couponDiscount = action.payload;
//     },
//     clearCart: (state) => {
//       state.products = [];
//       state.couponDiscount = 0;
//       clearOrderedProducts(state); // Clear ordered products in orderSlice as well
//     },
//     setOrderedProducts: (state) => {
//       state.products = []; // Clear cart products upon placing order
//       state.couponDiscount = 0; // Reset coupon discount upon placing order
//       // No need to set orderedProducts here directly, handle that in orderSlice
//     },
//   },
// });

// export const { addToCart, removeFromCart, applyCoupon, clearCart, setOrderedProducts } = cartSlice.actions;
// export default cartSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';
// import { clearOrderedProducts } from './orderSlice'; // Import clearOrderedProducts from orderSlice

// const initialState = {
//   cartItems: [],      // Initial state of cart items
//   couponDiscount: 0,  // Initial state of coupon discount
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       // Check if the product is already in cart, and if so, update its quantity instead of adding a duplicate
//       const existingIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
//       if (existingIndex !== -1) {
//         state.cartItems[existingIndex].quantity += action.payload.quantity;
//       } else {
//         state.cartItems.push(action.payload);
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
//     },
//     applyCoupon: (state, action) => {
//       state.couponDiscount = action.payload;
//     },
//     clearCart: (state) => {
//       state.cartItems = [];
//       state.couponDiscount = 0;
//       clearOrderedProducts(state); // Clear ordered products in orderSlice as well
//     },
//     setOrderedProducts: (state) => {
//       state.cartItems = [];
//       state.couponDiscount = 0;
//       // No need to set orderedProducts here directly, handle that in orderSlice
//     },
//     updateCartFromBackend: (state, action) => {
//       state.cartItems = action.payload;
//     },
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   applyCoupon,
//   clearCart,
//   setOrderedProducts,
//   updateCartFromBackend
// } = cartSlice.actions;

// export default cartSlice.reducer;


// cartSlice.js




import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],      // Initial state of cart items
  couponDiscount: 0,  // Initial state of coupon discount
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Check if the product is already in cart, and if so, update its quantity instead of adding a duplicate
      const existingIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      if (existingIndex !== -1) {
        state.cartItems[existingIndex].quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
    },
    applyCoupon: (state, action) => {
      state.couponDiscount = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.couponDiscount = 0;
    },
    setOrderedProducts: (state) => {
      state.cartItems = [];
      state.couponDiscount = 0;
      // No need to set orderedProducts here directly, handle that in orderSlice
    },
    updateCartFromBackend: (state, action) => {
      state.cartItems = action.payload; // Ensure this correctly sets the cart items array
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  applyCoupon,
  clearCart,
  setOrderedProducts,
  updateCartFromBackend
} = cartSlice.actions;

export default cartSlice.reducer;
