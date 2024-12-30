import { createSlice } from "@reduxjs/toolkit";
import {
  GetAllUserAction,
  LoadAction,
  LoginAction,
  logoutAction,
  SignUpAction,
} from "../../actions/authActions";

const initialState = {
  user: {},
  all_user: [],
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "user",
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
      .addCase(LoginAction.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(LoginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(LoginAction.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // register
      .addCase(SignUpAction.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(SignUpAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(SignUpAction.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // load
      .addCase(LoadAction.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(LoadAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(LoadAction.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // logout
      .addCase(logoutAction.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(GetAllUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.all_user = action.payload.user;
      })
      .addCase(GetAllUserAction.rejected, handleError);
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
