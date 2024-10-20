import { createSlice } from "@reduxjs/toolkit";

//appAPI
import appApi from "../services/appApi";

const initialState = [];

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProducts: (_, action) => {
      return action.payload;
    },
    deleteProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.createProduct.matchFulfilled,
      (_, { payload }) => payload
    );
    builder.addMatcher(
      appApi.endpoints.updateProducts?.matchFulfilled,
      (_, { payload }) => payload
    );
    builder.addMatcher(
      appApi.endpoints.deleteProduct.matchFulfilled,
      (_, { payload }) => payload
    );
  },
});

export const { updateProducts, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
