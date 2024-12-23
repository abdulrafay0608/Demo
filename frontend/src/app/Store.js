// import productSlice from "../features/productSlice";
// import productDetailSlice from "../features/productDetailSlice";
// products: productSlice,
// productDetail: productDetailSlice,
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../feature/auth/authSlice";

const store = configureStore({
  reducer: {
    user: authSlice,
  },
});

export default store;
