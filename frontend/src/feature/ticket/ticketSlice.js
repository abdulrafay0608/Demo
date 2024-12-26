import { createSlice } from "@reduxjs/toolkit";
import {
  AddTicketAction,
  DeleteTicketAction,
  EditTicketAction,
  GetTicketAction,
} from "../../actions/ticketAction";

const initialState = {
  ticket: [],
  loading: false,
  error: null,
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddTicketAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddTicketAction.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket = action.payload.ticket;
      })
      .addCase(AddTicketAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(GetTicketAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTicketAction.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket = action.payload.ticket;
      })
      .addCase(GetTicketAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(EditTicketAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EditTicketAction.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket = action.payload.ticket;
      })
      .addCase(EditTicketAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(DeleteTicketAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteTicketAction.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket = action.payload.ticket;
      })
      .addCase(DeleteTicketAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = ticketSlice.actions;
export default ticketSlice.reducer;
