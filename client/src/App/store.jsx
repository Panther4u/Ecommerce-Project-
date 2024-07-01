// import { configureStore } from "@reduxjs/toolkit";
// import globalSlice from "../Features/globalSlice";
// import productsSlice from "../Features/productsSlice";
// import userSlice from "../Features/userSlice";

// export const store = configureStore({
//   reducer: {
//     global: globalSlice,
//     user: userSlice,
//     products: productsSlice,
//   },
// });



// store.js

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import globalReducer from '../Features/globalSlice';
import productsReducer from '../Features/productsSlice';
import userReducer from '../Features/userSlice';
import cartReducer from '../Features/cartSlice'; 
import orderReducer from '../Features/orderSlice';

const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
  // add other reducers here
});

const store = configureStore({
  reducer: rootReducer,
  // Add any additional middleware or configurations here
});

export default store;

