import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import searchReducer from "./slices/searchSlice";
import cartCountReducer from "./slices/cartCountSlice";
import bookCartReducer from "./slices/bookCartSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cartCount: cartCountReducer,
  bookCart: bookCartReducer,
});
