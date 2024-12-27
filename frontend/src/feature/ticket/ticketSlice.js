import { createSlice } from "@reduxjs/toolkit";
import {
  AddTicketAction,
  DeleteTicketAction,
  EditTicketAction,
  GetSingleTicketAction,
  GetTicketAction,
  UpdateStatusAction,
} from "../../actions/ticketAction";

const initialState = {
  allTickets: [],
  singleTicket: null,
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
    const handleError = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      .addCase(AddTicketAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddTicketAction.fulfilled, (state, action) => {
        state.loading = false;
        state.allTickets = [...state.allTickets, action.payload.ticket];
      })
      .addCase(AddTicketAction.rejected, handleError)
      
      .addCase(GetTicketAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetTicketAction.fulfilled, (state, action) => {
        state.loading = false;
        state.allTickets = action.payload.tickets;
      })
      .addCase(GetTicketAction.rejected, handleError)

      .addCase(GetSingleTicketAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetSingleTicketAction.fulfilled, (state, action) => {
        state.loading = false;
        state.singleTicket = action.payload.ticket;
      })
      .addCase(GetSingleTicketAction.rejected, handleError)

      .addCase(UpdateStatusAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateStatusAction.fulfilled, (state, action) => {
        state.loading = false;
        state.singleTicket = action.payload.ticket;
      })
      .addCase(UpdateStatusAction.rejected, handleError)

      .addCase(EditTicketAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(EditTicketAction.fulfilled, (state, action) => {
        state.loading = false;
        state.allTickets = state.allTickets.map((ticket) =>
          ticket._id === action.payload.ticket._id
            ? action.payload.ticket
            : ticket
        );
      })
      .addCase(EditTicketAction.rejected, handleError)

      .addCase(DeleteTicketAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteTicketAction.fulfilled, (state, action) => {
        state.loading = false;
        state.allTickets = state.allTickets.filter(
          (ticket) => ticket._id !== action.payload.ticket._id
        );
      })
      .addCase(DeleteTicketAction.rejected, handleError);
  },
});

export const { clearError } = ticketSlice.actions;
export default ticketSlice.reducer;
