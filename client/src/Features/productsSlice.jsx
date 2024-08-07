// import { createSlice } from "@reduxjs/toolkit";

// const productsDataLocal = localStorage.getItem("productsSliceData");

// const initialState = productsDataLocal
//   ? JSON.parse(productsDataLocal)
//   : {
      // saveBillingInfoToLocal: false,
      // favoritesProducts: [],
      // searchProducts: [],
      // cartProducts: [],
      // wishList: [],
//     };

// const productsSlice = createSlice({
//   initialState,
//   name: "productsSlice",
//   reducers: {
//     updateProductsState: (state, { payload: { key, value } }) => {
//       state[key] = value;
//     },
//     addToArray: (state, { payload: { key, value } }) => {
//       state[key].push(value);
//     },
//     removeById: (state, { payload: { key, id } }) => {
//       const updatedState = state[key].filter((item) => item.id !== id);
//       state[key] = updatedState;
//     },
//     removeByKeyName: (state, { payload: { dataKey, itemKey, keyValue } }) => {
//       const updatedState = state[dataKey].filter(
//         (item) => item[itemKey] !== keyValue
//       );
//       state[dataKey] = updatedState;
//     },
//     setEmptyArrays: (state, { payload: { keys } }) => {
//       for (let i = 0; i < keys.length; i++) state[keys[i]] = [];
//     },
//   },
// });

// export const {
//   updateProductsState,
//   addToArray,
//   removeById,
//   removeByKeyName,
//   setEmptyArrays,
// } = productsSlice.actions;
// export default productsSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// // Initial state setup from localStorage or default values
// const productsDataLocal = localStorage.getItem("productsSliceData");

// let initialState;

// if (productsDataLocal && productsDataLocal !== "undefined") {
//   try {
//     initialState = JSON.parse(productsDataLocal);
//   } catch (e) {
//     console.error("Failed to parse productsSliceData from localStorage:", e);
//     initialState = getDefaultInitialState();
//   }
// } else {
//   initialState = getDefaultInitialState();
// }

// function getDefaultInitialState() {
//   return {
//     cartProducts: [],
//     discount: 0,
//     appliedCoupon: null,
    
//   };
// }

// // Create a slice for managing products state
// const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     updateProductsState: (state, { payload: { key, value } }) => {
//       state[key] = value;
//       localStorage.setItem("productsSliceData", JSON.stringify(state));
//     },
//     addToArray: (state, { payload: { key, value } }) => {
//       state[key].push(value);
//       localStorage.setItem("productsSliceData", JSON.stringify(state));
//     },
//     removeById: (state, { payload: { key, id } }) => {
//       state[key] = state[key].filter((item) => item.id !== id);
//       localStorage.setItem("productsSliceData", JSON.stringify(state));
//     },
    // removeByKeyName: (state, { payload: { dataKey, itemKey, keyValue } }) => {
    //   state[dataKey] = state[dataKey].filter(
    //     (item) => item[itemKey] !== keyValue
    //   );
    //   localStorage.setItem("productsSliceData", JSON.stringify(state));
    // },
//     setEmptyArrays: (state, { payload: { keys } }) => {
//       keys.forEach((key) => {
//         state[key] = [];
//       });
//       localStorage.setItem("productsSliceData", JSON.stringify(state));
//     },
//     applyCoupon: (state, { payload: { couponCode, discount } }) => {
//       state.appliedCoupon = couponCode;
//       state.discount = discount;
//       localStorage.setItem("productsSliceData", JSON.stringify(state));
//     },
//   },
// });

// // Export actions and reducer
// export const {
//   updateProductsState,
//   addToArray,
//   removeById,
//   removeByKeyName,
//   setEmptyArrays,
//   applyCoupon,
// } = productsSlice.actions;

// export default productsSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// // Initial state setup from localStorage or default values
// const productsDataLocal = localStorage.getItem("productsSliceData");

// let initialState;

// if (productsDataLocal && productsDataLocal !== "undefined") {
//   try {
//     initialState = JSON.parse(productsDataLocal);
//   } catch (e) {
//     console.error("Failed to parse productsSliceData from localStorage:", e);
//     initialState = getDefaultInitialState();
//   }
// } else {
//   initialState = getDefaultInitialState();
// }

// function getDefaultInitialState() {
//   return {
//     cartProducts: [],
//     favoritesProducts: [],
//     discount: 0,
//     appliedCoupon: null,
//     wishList: [],
//     products: [], // Ensure products is initialized as an empty array
//   };
// }

// // Create a slice for managing products state
// const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     updateProductsState: (state, { payload }) => {
//       Object.assign(state, payload); // Merge payload object into state
//       localStorage.setItem("productsSliceData", JSON.stringify(state));
//     },
//     addToArray: (state, { payload: { key, value } }) => {
//       state[key].push(value);
//       localStorage.setItem("productsSliceData", JSON.stringify(state));
//     },
//     removeById: (state, { payload: { key, id } }) => {
//       state[key] = state[key].filter((item) => item.id !== id);
//       localStorage.setItem("productsSliceData", JSON.stringify(state));
//     },
//     removeByKeyName: (state, { payload: { dataKey, itemKey, keyValue } }) => {
//       state[dataKey] = state[dataKey].filter(
//         (item) => item[itemKey] !== keyValue
//       );
//       localStorage.setItem("productsSliceData", JSON.stringify(state));
//     },
//     setEmptyArrays: (state, { payload: { keys } }) => {
//       keys.forEach((key) => {
//         state[key] = [];
//       });
//       localStorage.setItem("productsSliceData", JSON.stringify(state));
//     },
//     applyCoupon: (state, { payload: { couponCode, discount } }) => {
//       state.appliedCoupon = couponCode;
//       state.discount = discount;
//       localStorage.setItem("productsSliceData", JSON.stringify(state));
//     },
//   },
// });

// // Export actions and reducer
// export const {
//   updateProductsState,
//   addToArray,
//   removeById,
//   removeByKeyName,
//   setEmptyArrays,
//   applyCoupon,
// } = productsSlice.actions;

// // Selector to get products array from state
// export const selectProducts = (state) => state.products.products;

// // Export the reducer
// export default productsSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Load cart items from local storage if available
// const savedCartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

// const initialState = {
//   cartProducts: savedCartProducts,      // Initialize cartProducts from localStorage
//   favoritesProducts: [],
//   discount: 0,
//   appliedCoupon: null,
//   wishList: [],
//   products: [],
//   searchProducts: [],
//   status: 'idle',
//   error: null,
// };

// const API_URL = "${API_BASE_URL}/api/products";

// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async () => {
//     try {
//       const response = await axios.get(API_URL);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       throw error;
//     }
//   }
// );

// const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     updateProductsState: (state, { payload }) => {
//       Object.assign(state, payload);
//       localStorage.setItem("productsSliceData", JSON.stringify(state));
//     },
//     addToArray: (state, { payload: { key, value } }) => {
//       state[key].push(value);
//       localStorage.setItem("productsSliceData", JSON.stringify(state));
//     },
//     removeById: (state, { payload: { key, id } }) => {
//       state[key] = state[key].filter((item) => item.id !== id);
//       localStorage.setItem("productsSliceData", JSON.stringify(state));
//     },
//     removeByKeyName: (state, { payload: { dataKey, itemKey, keyValue } }) => {
//       state[dataKey] = state[dataKey].filter(
//         (item) => item[itemKey] !== keyValue
//       );
//       localStorage.setItem("productsSliceData", JSON.stringify(state));
//     },
//     setEmptyArrays: (state, { payload: { keys } }) => {
//       keys.forEach((key) => {
//         state[key] = [];
//       });
//       localStorage.setItem("productsSliceData", JSON.stringify(state));
//     },
//     applyCoupon: (state, { payload: { couponCode, discount } }) => {
//       state.appliedCoupon = couponCode;
//       state.discount = discount;
//       localStorage.setItem("productsSliceData", JSON.stringify(state));
//     },
//     setSearchProducts: (state, { payload }) => {
//       state.searchProducts = payload;
//       localStorage.setItem("productsSliceData", JSON.stringify(state));
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.products = action.payload;
//         localStorage.setItem("productsSliceData", JSON.stringify(state));
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const {
//   updateProductsState,
//   addToArray,
//   removeById,
//   removeByKeyName,
//   setEmptyArrays,
//   applyCoupon,
//   setSearchProducts,
// } = productsSlice.actions;

// export const selectProducts = (state) => state.products.products;
// export const selectCartProducts = (state) => state.products.cartProducts;
// export const selectFavoritesProducts = (state) => state.products.favoritesProducts;
// export const selectWishListProducts = (state) => state.products.wishList;
// export const selectSearchProducts = (state) => state.products.searchProducts;

// export default productsSlice.reducer;
// productsSlice.js




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectUserId } from './userSlice';
import { API_BASE_URL } from 'src/api/index';

const savedState = JSON.parse(localStorage.getItem('productsSliceData')) || {};
const initialState = {
  cartProducts: savedState.cartProducts || [],
  favoritesProducts: savedState.favoritesProducts || [],
  discount: savedState.discount || 0,
  appliedCoupon: savedState.appliedCoupon || null,
  wishList: savedState.wishList || [],
  products: savedState.products || [],
  searchProducts: savedState.searchProducts || [],
  status: 'idle',
  error: null,
  userId: savedState.userId || null,
  totalAmount: savedState.totalAmount || 0,  // Add this line
};


const API_URL = `${API_BASE_URL}/api/products`;
const CART_API_URL = `${API_BASE_URL}/api/cart`;
const WISHLIST_API_URL = `${API_BASE_URL}/api/wishlist`;

// Thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
);

export const fetchCartProducts = createAsyncThunk(
  'cart/fetchCartProducts',
  async ({ userId }) => {
    try {
      const response = await axios.get(`${CART_API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cart products:', error);
      throw error;
    }
  }
);

export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async ({ userId, product }) => {
    try {
      const response = await axios.post(CART_API_URL, { userId, product });
      return response.data;
    } catch (error) {
      console.error('Error adding product to cart:', error);
      throw error;
    }
  }
);

export const updateProductQuantity = createAsyncThunk(
  'cart/updateProductQuantity',
  async ({ productId, quantity }, { rejectWithValue, getState }) => {
    try {
      const userId = selectUserId(getState());
      const response = await axios.put(`${CART_API_URL}/${userId}/${productId}`, { quantity });
      return response.data;
    } catch (error) {
      console.error('Error updating product quantity in cart:', error);
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  'cart/removeProductFromCart',
  async ({ productId, userId }, { rejectWithValue }) => {
    try {
      await axios.delete(`${CART_API_URL}/${userId}/${productId}`);
      return { productId };
    } catch (error) {
      console.error('Error removing product from cart:', error);
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${WISHLIST_API_URL}/${userId}`);
      return response.data.products;
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);

export const addProductToWishlist = createAsyncThunk(
  'wishlist/addProductToWishlist',
  async ({ userId, product }) => {
    try {
      const response = await axios.post(`${WISHLIST_API_URL}/add`, { userId, product });
      return response.data.products;
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      throw error;
    }
  }
);

export const removeProductFromWishlist = createAsyncThunk(
  'wishlist/removeProductFromWishlist',
  async ({ productId, userId }, { rejectWithValue }) => {
    try {
      await axios.delete(`${WISHLIST_API_URL}/remove/${userId}/${productId}`);
      return { productId };
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);




// Slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductsState: (state, action) => {
      state[action.payload.key] = action.payload.data;
      saveToLocalStorage(state);
    },
    addToArray: (state, { payload: { key, value } }) => {
      if (Array.isArray(state[key])) {
        state[key].push(value);
        saveToLocalStorage(state);
      } else {
        console.error(`State key '${key}' is not an array.`);
      }
    },
    removeById: (state, { payload: { key, id } }) => {
      state[key] = state[key].filter((item) => item.id !== id);
      saveToLocalStorage(state);
    },
    removeByKeyName: (state, { payload: { dataKey, itemKey, keyValue } }) => {
      state[dataKey] = state[dataKey].filter(
        (item) => item[itemKey] !== keyValue
      );
      localStorage.setItem("productsSliceData", JSON.stringify(state));
    },
    setEmptyArrays: (state, { payload: { keys } }) => {
      keys.forEach((key) => {
        state[key] = [];
      });
      saveToLocalStorage(state);
    },
    applyCoupon: (state, { payload: { couponCode, discount } }) => {
      state.appliedCoupon = couponCode;
      state.discount = discount;
      saveToLocalStorage(state);
    },
    setSearchProducts: (state, { payload }) => {
      state.searchProducts = payload;
      saveToLocalStorage(state);
    },
    addToCart: (state, { payload }) => {
      const existingIndex = state.cartProducts.findIndex(item => item.id === payload.id);
      if (existingIndex !== -1) {
        state.cartProducts[existingIndex].quantity += payload.quantity;
      } else {
        state.cartProducts.push(payload);
      }
      saveToLocalStorage(state);
    },
    removeFromCart: (state, { payload: { id } }) => {
      state.cartProducts = state.cartProducts.filter(item => item.id !== id);
      saveToLocalStorage(state);
    },
    clearCart: (state) => {
      state.cartProducts = [];
      saveToLocalStorage(state);
    },
    updateCart: (state, { payload }) => {
      state.cartProducts = payload;
      saveToLocalStorage(state);
    },
    update: (state, { payload }) => {
      const { key, value } = payload;
      state[key] = value;
      saveToLocalStorage(state);
    },
    updateUserId: (state, { payload }) => {
      state.userId = payload;
      saveToLocalStorage(state);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    updateTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
      saveToLocalStorage(state);
    },
    clearCoupon: (state) => {
      state.coupon = null; // Clear the coupon
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.products = payload;
        saveToLocalStorage(state);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Fetch cart products
      .addCase(fetchCartProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartProducts.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.cartProducts = payload.products;
        saveToLocalStorage(state);
      })
      .addCase(fetchCartProducts.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
      })
      // Add product to cart
      .addCase(addProductToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const existingIndex = state.cartProducts.findIndex(item => item.id === action.payload.id);
        
        if (existingIndex !== -1) {
          state.cartProducts[existingIndex].quantity = action.payload.quantity;
        } else {
          state.cartProducts.push(action.payload);
        }
        saveToLocalStorage(state);
      })      
      .addCase(addProductToCart.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
      })
      // Update product quantity
      .addCase(updateProductQuantity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductQuantity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedProduct = action.payload;
        const index = state.cartProducts.findIndex(item => item.id === updatedProduct.id);
        if (index !== -1) {
          state.cartProducts[index] = updatedProduct;
        }
        saveToLocalStorage(state);
      })
      .addCase(updateProductQuantity.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      // Remove product from cart
      .addCase(removeProductFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { productId } = action.payload;
        state.cartProducts = state.cartProducts.filter(product => product.id !== productId);
        saveToLocalStorage(state);
      })
      .addCase(removeProductFromCart.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      // Fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wishList = action.payload;
        saveToLocalStorage(state);
      })
      .addCase(fetchWishlist.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
      })
      // Add product to wishlist
      .addCase(addProductToWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wishList = action.payload;
        saveToLocalStorage(state);
      })
      .addCase(addProductToWishlist.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
      })
      // Remove product from wishlist
      .addCase(removeProductFromWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { productId } = action.payload;
        state.wishList = state.wishList.filter(product => product.id !== productId);
        saveToLocalStorage(state);
      })
      .addCase(removeProductFromWishlist.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
      });
  }
});

export const {
  updateProductsState,
  addToArray,
  removeById,
  removeByKeyName,
  setEmptyArrays,
  applyCoupon,
  setSearchProducts,
  addToCart,
  removeFromCart,
  clearCart,
  updateCart,
  update,
  updateUserId,
  setUserId,
  clearCoupon
} = productsSlice.actions;


const saveToLocalStorage = (state) => {
  localStorage.setItem('productsSliceData', JSON.stringify({
    cartProducts: state.cartProducts,
    favoritesProducts: state.favoritesProducts,
    discount: state.discount,
    appliedCoupon: state.appliedCoupon,
    wishList: state.wishList,
    products: state.products,
    searchProducts: state.searchProducts,
    userId: state.userId,
    totalAmount: state.totalAmount,  // Add this line
  }));
};





export const selectProducts = (state) => state.products.products;
export const selectCartProducts = (state) => state.products.cartProducts;
export const selectFavoritesProducts = (state) => state.products.favoritesProducts;
export const selectWishList = (state) => state.products.wishList;
export const selectDiscount = (state) => state.products.discount;
export const selectAppliedCoupon = (state) => state.products.appliedCoupon;
export const selectSearchProducts = (state) => state.products.searchProducts;
export const selectStatus = (state) => state.products.status;
export const selectTotalAmount = (state) => state.products.totalAmount;
export const selectError = (state) => state.products.error;

export default productsSlice.reducer;