import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../feature/auth/authSlice";
import ticketSlice from "../feature/ticket/ticketSlice";
import departmentSlice from "../feature/adminSlice/departmentSlice";
import serviceSlice from "../feature/adminSlice/serviceSlice";
import ticketStatusesSlice from "../feature/adminSlice/ticketStatusesSlice";

const store = configureStore({
  reducer: {
    user: authSlice,
    ticket: ticketSlice,
    department: departmentSlice,
    service: serviceSlice,
    ticket_statuses: ticketStatusesSlice,
  },
});

export default store;
