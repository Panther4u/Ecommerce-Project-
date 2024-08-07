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
    // updateCartFromBackend: (state, action) => {
    //   state.cartItems = action.payload;
    // },
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




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from 'src/api/index';

// Helper function to safely retrieve and parse JSON from localStorage
function getLocalStorageItem(key) {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error(`Failed to parse localStorage item '${key}':`, e);
    return null;
  }
}

// Initial state for the cart slice
const initialState = {
  products: [], // List of products in the cart
  cartItems: getLocalStorageItem('cartItems') || [], // Cart items persisted in localStorage
  couponDiscount: getLocalStorageItem('couponDiscount') || 0, // Applied coupon discount from localStorage
  availableCoupons: [], // List of available coupons fetched from the backend
  appliedCoupon: null, // Details of the applied coupon
  status: 'idle', // Status of async operations ('idle', 'loading', 'succeeded', 'failed')
  error: null, // Error message if an async operation fails
};

// Fetch available coupons
export const fetchAvailableCoupons = createAsyncThunk(
  'cart/fetchAvailableCoupons',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/coupons/available`, {
        params: { userId }
      });
      console.log('Fetched Coupons:', response.data); // Debugging line
      return response.data;
    } catch (error) {
      console.error('Error fetching coupons:', error); // Detailed error logging
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);

// Apply coupon
export const applyCoupon = createAsyncThunk(
  'cart/applyCoupon',
  async ({ couponCode, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/coupons/apply`, { couponCode, userId });
      return response.data;
    } catch (error) {
      console.error('Error applying coupon:', error); // Detailed error logging
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Reducer to handle setting the coupon discount
    setCouponDiscount(state, action) {
      state.couponDiscount = action.payload;
      localStorage.setItem('couponDiscount', JSON.stringify(action.payload));
    },
    // Reducer to handle removing an applied coupon and resetting the discount
    removeCoupon(state) {
      state.appliedCoupon = null;
      state.couponDiscount = 0;
      localStorage.removeItem('couponDiscount');
    },
    // Reducer to handle setting ordered products
    setOrderedProducts(state) {
      state.cartItems = [];
      state.couponDiscount = 0;
      state.appliedCoupon = null;
      localStorage.removeItem('cartItems');
      localStorage.removeItem('couponDiscount');
    },
    // Reducer to handle updating cart items directly
    updateCartItems(state, action) {
      state.cartItems = action.payload;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    // Reducer to handle updating cart items from backend
    updateCartFromBackend(state, action) {
      state.cartItems = action.payload;
    },
    // Reducer to handle setting available coupons
    setAvailableCoupons(state, action) {
      state.availableCoupons = action.payload;
    },
    resetCouponDiscount: (state) => {
      state.couponDiscount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableCoupons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAvailableCoupons.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.availableCoupons = payload;
      })
      .addCase(fetchAvailableCoupons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(applyCoupon.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(applyCoupon.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.couponDiscount = payload.discountPercentage || 0;
        state.appliedCoupon = payload.couponCode;
        localStorage.setItem('couponDiscount', JSON.stringify(state.couponDiscount));
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const {
  setCouponDiscount,
  removeCoupon,
  setOrderedProducts,
  updateCartItems,
  updateCartFromBackend,
  setAvailableCoupons,
  resetCouponDiscount
} = cartSlice.actions;

export default cartSlice.reducer;
