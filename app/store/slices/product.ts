import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState, AppThunk } from "..";

export const ProductSlice = createSlice({
  name: "product",

  initialState: {
    products: [],
  },

  reducers: {
    setProductData: (state, action) => {
      state.products = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", action.payload);

      if (!action.payload.product.products) {
        return state;
      }

      state.products = action.payload.product.products;
    },
  },
});

export const { setProductData } = ProductSlice.actions;

export const selectProduct = (state: AppState) => state.product;

export const fetchProduct = (): AppThunk => async (dispatch) => {
  console.log("fetchProduct invoked");
  const timeoutPromise = (timeout: number) =>
    new Promise((resolve) => setTimeout(resolve, timeout));

  await timeoutPromise(1000);

  dispatch(setProductData("BA DUM DA THUNK"));
};

export default ProductSlice.reducer;
