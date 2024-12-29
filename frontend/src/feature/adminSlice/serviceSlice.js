import { createSlice } from "@reduxjs/toolkit";
import {
  AddServiceAction,
  DeleteServiceAction,
  EditServiceAction,
  GetServicesAction,
} from "../../actions/serviceAction";

const initialState = {
  service: [],
  loading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: "service",
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
      // Add service
      .addCase(AddServiceAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddServiceAction.fulfilled, (state, action) => {
        state.loading = false;
        state.service = [...state.service, action.payload.services];
      })
      .addCase(AddServiceAction.rejected, handleError)

      // Get service
      .addCase(GetServicesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetServicesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload.services;
      })
      .addCase(GetServicesAction.rejected, handleError)

      // Delete service
      .addCase(DeleteServiceAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteServiceAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.service = state.service.filter(
          (serv) => serv._id !== action.payload.services._id
        );
      })
      .addCase(DeleteServiceAction.rejected, handleError)

      // Edit service
      .addCase(EditServiceAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(EditServiceAction.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload.services;
      })
      .addCase(EditServiceAction.rejected, handleError);
  },
});

export const { clearError } = serviceSlice.actions;
export default serviceSlice.reducer;
