import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../feature/auth/authSlice";
import ticketSlice from "../feature/ticket/ticketSlice";
import departmentSlice from "../feature/adminSlice/departmentSlice";
import serviceSlice from "../feature/adminSlice/serviceSlice";
import ticketStatusesSlice from "../feature/adminSlice/ticketStatusesSlice";
import ticketSeveritySlice from "../feature/adminSlice/ticketSeveritySlice";
import ticketPrioritySlice from "../feature/adminSlice/ticketPrioritySlice";
import ProjectSlice from "../feature/projects/projectSlice";

const store = configureStore({
  reducer: {
    user: authSlice,
    ticket: ticketSlice,
    projects: ProjectSlice,
    department: departmentSlice,
    service: serviceSlice,
    ticket_statuses: ticketStatusesSlice,
    ticket_severity: ticketSeveritySlice,
    ticket_priority: ticketPrioritySlice,
  },
});

export default store;
