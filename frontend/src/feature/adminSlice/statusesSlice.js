import { createSlice } from "@reduxjs/toolkit";
import {
  AddStatusesAction,
  DeleteStatusesAction,
  EditStatusesAction,
  GetStatusesAction,
} from "../../actions/statusesAction";

const initialState = {
  statuses: [],
  loading: false,
  error: null,
};

const statusesSlice = createSlice({
  name: "statuses",
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
      .addCase(AddStatusesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddStatusesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.statuses = [...state.statuses, action.payload.status];
      })
      .addCase(AddStatusesAction.rejected, handleError)

      // Get status
      .addCase(GetStatusesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetStatusesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.statuses = action.payload.status;
      })
      .addCase(GetStatusesAction.rejected, handleError)

      // Delete status
      .addCase(DeleteStatusesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteStatusesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.statuses = state.statuses.filter(
          (sta) => sta._id !== action.payload.status._id
        );
      })
      .addCase(DeleteStatusesAction.rejected, handleError)

      // Edit service
      .addCase(EditStatusesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(EditStatusesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.statuses = action.payload.status;
      })
      .addCase(EditStatusesAction.rejected, handleError);
  },
});

export const { clearError } = statusesSlice.actions;
export default statusesSlice.reducer;
