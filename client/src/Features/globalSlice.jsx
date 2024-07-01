import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOverlayActive: false,
  isMobileMenuActive: false,
  isProfileMenuActive: false,
  loadingCategoryPage: false,
  isSectionsMenuActive: false,
  isZoomInPreviewActive: false,
  loadingProductDetails: false,
  loadingSearchProducts: true,
  loadingProductsPage: true,
  previewImg: null,
};

const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    updateGlobalState: (state, { payload: { key, value } }) => {
      state[key] = value;
    },
    toggleMobileMenu: (state, { payload }) => {
      state.isMobileMenuActive = payload;
    },
  },
});

export const { updateGlobalState, toggleMobileMenu } = globalSlice.actions;
export default globalSlice.reducer;
