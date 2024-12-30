import { createSlice } from "@reduxjs/toolkit";
import {
  AddTicketSeverityAction,
  DeleteTicketSeverityAction,
  EditTicketSeverityAction,
  GetTicketSeverityAction,
} from "../../actions/ticketSeverityAction";

const initialState = {
  ticket_severity: [],
  loading: false,
  error: null,
};

const ticketSeveritySlice = createSlice({
  name: "ticket_severity",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handleError = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };
    builder
      // Add status
      .addCase(AddTicketSeverityAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddTicketSeverityAction.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket_severity = [
          ...state.ticket_severity,
          action.payload.severity,
        ];
      })
      .addCase(AddTicketSeverityAction.rejected, handleError)

      // Get status
      .addCase(GetTicketSeverityAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTicketSeverityAction.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket_severity = action.payload.severity;
      })
      .addCase(GetTicketSeverityAction.rejected, handleError)

      // Delete status
      .addCase(DeleteTicketSeverityAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteTicketSeverityAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ticket_severity = state.ticket_severity.filter(
          (sever) => sever._id !== action.payload.severity._id
        );
      })
      .addCase(DeleteTicketSeverityAction.rejected, handleError)

      // Edit service
      .addCase(EditTicketSeverityAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(EditTicketSeverityAction.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket_severity = state.ticket_severity.filter(
          (sever) => sever._id !== action.payload.severity._id
        );
      })
      .addCase(EditTicketSeverityAction.rejected, handleError);
  },
});

export const { clearError } = ticketSeveritySlice.actions;
export default ticketSeveritySlice.reducer;
