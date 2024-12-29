import { createSlice } from "@reduxjs/toolkit";
import {
  AddTicketStatusesAction,
  DeleteTicketStatusesAction,
  EditTicketStatusesAction,
  GetTicketStatusesAction,
} from "../../actions/ticketStatusesAction";

const initialState = {
  ticket_statuses: [],
  loading: false,
  error: null,
};

const ticketStatusesSlice = createSlice({
  name: "ticket_statuses",
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
      .addCase(AddTicketStatusesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddTicketStatusesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket_statuses = [
          ...state.ticket_statuses,
          action.payload.status,
        ];
      })
      .addCase(AddTicketStatusesAction.rejected, handleError)

      // Get status
      .addCase(GetTicketStatusesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTicketStatusesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket_statuses = action.payload.status;
      })
      .addCase(GetTicketStatusesAction.rejected, handleError)

      // Delete status
      .addCase(DeleteTicketStatusesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteTicketStatusesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ticket_statuses = state.ticket_statuses.filter(
          (sta) => sta._id !== action.payload.status._id
        );
      })
      .addCase(DeleteTicketStatusesAction.rejected, handleError)

      // Edit service
      .addCase(EditTicketStatusesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(EditTicketStatusesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket_statuses = action.payload.status;
      })
      .addCase(EditTicketStatusesAction.rejected, handleError);
  },
});

export const { clearError } = ticketStatusesSlice.actions;
export default ticketStatusesSlice.reducer;
