import { createSlice } from "@reduxjs/toolkit";
import {
  AddCustomerAction,
  GetAllCustomersAction,
  GetSingleCustomerAction,
  UpdateCustomerStatusAction,
} from "../../actions/customersAction";

const initialState = {
  customers: [],
  singleCustomer: null,
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: "customers",
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
      .addCase(AddCustomerAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddCustomerAction.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = [...state.customers, action.payload.customer];
      })
      .addCase(AddCustomerAction.rejected, handleError)

      .addCase(GetAllCustomersAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllCustomersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.customers;
      })
      .addCase(GetAllCustomersAction.rejected, handleError)

      .addCase(GetSingleCustomerAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetSingleCustomerAction.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCustomer = action.payload.customer;
      })
      .addCase(GetSingleCustomerAction.rejected, handleError)

      //   .addCase(GetUserProjectsAction.pending, (state) => {
      //     state.loading = true;
      //   })
      //   .addCase(GetUserProjectsAction.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.userProjects = action.payload.projects;
      //   })
      //   .addCase(GetUserProjectsAction.rejected, handleError)

      .addCase(UpdateCustomerStatusAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateCustomerStatusAction.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.customer;
      })
      .addCase(UpdateCustomerStatusAction.rejected, handleError);

    //   .addCase(EditTicketAction.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(EditTicketAction.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.allTickets = state.allTickets.map((ticket) =>
    //       ticket._id === action.payload.ticket._id
    //         ? action.payload.ticket
    //         : ticket
    //     );
    //   })
    //   .addCase(EditTicketAction.rejected, handleError)

    //   .addCase(DeleteTicketAction.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(DeleteTicketAction.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.allTickets = state.allTickets.filter(
    //       (ticket) => ticket._id !== action.payload.ticket._id
    //     );
    //   })
    //   .addCase(DeleteTicketAction.rejected, handleError);
  },
});

export const { clearError } = customerSlice.actions;
export default customerSlice.reducer;
