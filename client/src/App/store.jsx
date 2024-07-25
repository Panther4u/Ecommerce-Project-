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

// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import globalReducer from '../Features/globalSlice';
// import productsReducer from '../Features/productsSlice';
// import userReducer from '../Features/userSlice';
// import cartReducer from '../Features/cartSlice'; 
// import orderReducer from '../Features/orderSlice';

// const rootReducer = combineReducers({
//   global: globalReducer,
//   user: userReducer,
//   products: productsReducer,
//   cart: cartReducer,
//   order: orderReducer,
//   // add other reducers here
// });

// const store = configureStore({
//   reducer: rootReducer,
//   // Add any additional middleware or configurations here
// });

// export default store;




import { configureStore, combineReducers } from '@reduxjs/toolkit';
import globalReducer from '../Features/globalSlice';
import productsReducer from '../Features/productsSlice';
import userReducer from '../Features/userSlice';
import cartReducer from '../Features/cartSlice';
import orderReducer from '../Features/orderSlice';

// Combine your reducers
const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
  // add other reducers here
});

// Load initial state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Failed to load state from localStorage', err);
    return undefined;
  }
};

// Save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error('Failed to save state to localStorage', err);
  }
};

// Configure store with initial state and middleware
const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(), // Initialize state from local storage
  // Add any additional middleware or configurations here
});

// Subscribe to store updates and save state to local storage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
