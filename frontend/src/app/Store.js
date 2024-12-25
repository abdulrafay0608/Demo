// import productSlice from "../features/productSlice";
// import productDetailSlice from "../features/productDetailSlice";
// products: productSlice,
// productDetail: productDetailSlice,
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../feature/auth/authSlice";
import ticketSlice from "../feature/ticket/ticketSlice";

const store = configureStore({
  reducer: {
    user: authSlice,
    ticket: ticketSlice,
  },
});

export default store;
