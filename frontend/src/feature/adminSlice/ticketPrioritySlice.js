import { createSlice } from "@reduxjs/toolkit";
import {
  AddTicketPriorityAction,
  DeleteTicketPriorityAction,
  EditTicketPriorityAction,
  GetTicketPriorityAction,
} from "../../actions/ticketPriorityAction";

const initialState = {
  ticket_priority: [],
  loading: false,
  error: null,
};

const ticketPrioritySlice = createSlice({
  name: "ticket_priority",
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
      .addCase(AddTicketPriorityAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddTicketPriorityAction.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket_priority = [
          ...state.ticket_priority,
          action.payload.priority,
        ];
      })
      .addCase(AddTicketPriorityAction.rejected, handleError)

      // Get status
      .addCase(GetTicketPriorityAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTicketPriorityAction.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket_priority = action.payload.priority;
      })
      .addCase(GetTicketPriorityAction.rejected, handleError)

      // Delete status
      .addCase(DeleteTicketPriorityAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteTicketPriorityAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ticket_priority = state.ticket_priority.filter(
          (prio) => prio._id !== action.payload.priority._id
        );
      })
      .addCase(DeleteTicketPriorityAction.rejected, handleError)

      // Edit service
      .addCase(EditTicketPriorityAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(EditTicketPriorityAction.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket_priority = state.ticket_priority.filter(
          (prio) => prio._id !== action.payload.priority._id
        );
      })
      .addCase(EditTicketPriorityAction.rejected, handleError);
  },
});

export const { clearError } = ticketPrioritySlice.actions;
export default ticketPrioritySlice.reducer;
