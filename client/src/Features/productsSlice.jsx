// import { createSlice } from "@reduxjs/toolkit";

// const productsDataLocal = localStorage.getItem("productsSliceData");

// const initialState = productsDataLocal
//   ? JSON.parse(productsDataLocal)
//   : {
//       saveBillingInfoToLocal: false,
//       favoritesProducts: [],
//       searchProducts: [],
//       cartProducts: [],
//       wishList: [],
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

import { createSlice } from "@reduxjs/toolkit";

// Initial state setup from localStorage or default values
const productsDataLocal = localStorage.getItem("productsSliceData");

let initialState;

if (productsDataLocal && productsDataLocal !== "undefined") {
  try {
    initialState = JSON.parse(productsDataLocal);
  } catch (e) {
    console.error("Failed to parse productsSliceData from localStorage:", e);
    initialState = getDefaultInitialState();
  }
} else {
  initialState = getDefaultInitialState();
}

function getDefaultInitialState() {
  return {
    cartProducts: [],
    discount: 0,
    appliedCoupon: null,
  };
}

// Create a slice for managing products state
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductsState: (state, { payload: { key, value } }) => {
      state[key] = value;
      localStorage.setItem("productsSliceData", JSON.stringify(state));
    },
    addToArray: (state, { payload: { key, value } }) => {
      state[key].push(value);
      localStorage.setItem("productsSliceData", JSON.stringify(state));
    },
    removeById: (state, { payload: { key, id } }) => {
      state[key] = state[key].filter((item) => item.id !== id);
      localStorage.setItem("productsSliceData", JSON.stringify(state));
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
      localStorage.setItem("productsSliceData", JSON.stringify(state));
    },
    applyCoupon: (state, { payload: { couponCode, discount } }) => {
      state.appliedCoupon = couponCode;
      state.discount = discount;
      localStorage.setItem("productsSliceData", JSON.stringify(state));
    },
  },
});

// Export actions and reducer
export const {
  updateProductsState,
  addToArray,
  removeById,
  removeByKeyName,
  setEmptyArrays,
  applyCoupon,
} = productsSlice.actions;

export default productsSlice.reducer;
