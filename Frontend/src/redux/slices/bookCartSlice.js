import { createSlice } from "@reduxjs/toolkit";
import axiosIntance from "../../utils/axiosInstance";

const initialState = {
  cart: [],
  total: 0,
};
const add = (pre, newData) => {
  const existance = pre.findIndex((x) => x._id === newData._id);
  axiosIntance.post("/cart/addtocart", { bookId: newData._id, amount: 1 });
  if (existance !== -1) {
    return pre.map((item, index) =>
      index === existance ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    return [...pre, { ...newData, quantity: 1 }];
  }
};
const remove = (pre, id) => {
  const idx = pre.findIndex((x) => x._id === id);
  axiosIntance.post("/cart/remove", { bookId: id, amount: 1 });
  if (pre[idx].quantity == 1) {
    pre.splice(idx, 1);
  } else {
    pre[idx].quantity--;
  }
  return pre;
};
const removeManyFunc = (pre, id, quantity) => {
  const idx = pre.findIndex((x) => x._id === id);
  // console.log(id, quantity, idx);
  axiosIntance.post("/cart/remove", { bookId: id, amount: quantity });
  // setTimeout(() => {}, 2);
  pre.splice(idx, 1);
  return pre;
};

const bookCartSlice = createSlice({
  name: "bookCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = add(state.cart, action.payload);
      state.total += action.payload.price;
    },
    removeToCart: (state, action) => {
      state.cart = remove(state.cart, action.payload._id);
      state.total -= action.payload.price;
    },
    removeMany: (state, action) => {
      state.cart = removeManyFunc(
        state.cart,
        action.payload._id,
        action.payload.quantity
      );
      state.total -= action.payload.price * action.payload.quantity;
    },
    clearCart: (state, action) => {
      state.cart = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeToCart, removeMany, clearCart } =
  bookCartSlice.actions;

export default bookCartSlice.reducer;
