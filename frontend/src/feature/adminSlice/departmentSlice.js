import { createSlice } from "@reduxjs/toolkit";
import {
  AddDepartmentAction,
  DeleteDepartmentAction,
  EditDepartmentAction,
  GetDepartmentsAction,
} from "../../actions/departmentAction";

const initialState = {
  department: [],
  loading: false,
  error: null,
};

const departmentSlice = createSlice({
  name: "department",
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
      // Add Department
      .addCase(AddDepartmentAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddDepartmentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.department = [...state.department, action.payload.department];
      })
      .addCase(AddDepartmentAction.rejected, handleError)

      // Get Departments
      .addCase(GetDepartmentsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetDepartmentsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.department = action.payload.department;
      })
      .addCase(GetDepartmentsAction.rejected, handleError)

      // Delete Department
      .addCase(DeleteDepartmentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteDepartmentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.department = state.department.filter(
          (depart) => depart._id !== action.payload.department._id
        );
      })
      .addCase(DeleteDepartmentAction.rejected, handleError)

      // Edit Department
      .addCase(EditDepartmentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(EditDepartmentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.department = action.payload.department;
      })
      .addCase(EditDepartmentAction.rejected, handleError);
  },
});

export const { clearError } = departmentSlice.actions;
export default departmentSlice.reducer;
