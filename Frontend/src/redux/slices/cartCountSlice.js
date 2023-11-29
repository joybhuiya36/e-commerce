import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const cartCountSlice = createSlice({
  name: "cartCount",
  initialState,
  reducers: {
    increase: (state, action) => {
      state.count = state.count + 1;
    },
    decrease: (state, action) => {
      state.count = state.count - 1;
    },
    decreaseMany: (state, action) => {
      state.count -= action.payload;
    },
    countZero: (state, action) => {
      state.count = 0;
    },
  },
});

export const { increase, decrease, decreaseMany, countZero } =
  cartCountSlice.actions;

export default cartCountSlice.reducer;
