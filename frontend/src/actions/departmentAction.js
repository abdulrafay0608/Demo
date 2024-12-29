import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export const AddDepartmentAction = createAsyncThunk(
  "departments/add",
  async (myForm, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/departments/add`,
        myForm
      );
      return { department: data.department }; // Ensure consistent payload structure
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "An error occurred";
      return rejectWithValue(message);
    }
  }
);

export const GetDepartmentsAction = createAsyncThunk(
  "departments/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/departments/get`);
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message || "An error occurred";
      return rejectWithValue(message);
    }
  }
);

export const DeleteDepartmentAction = createAsyncThunk(
  "departments/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${API_BASE_URL}/departments/delete/${id}`
      );
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message ||
            "Failed to delete the department. Please try again.";
      return rejectWithValue(message);
    }
  }
);

export const EditDepartmentAction = createAsyncThunk(
  "departments/edit",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/departments/edit/${id}`,
        updatedData
      );
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message || "An error occurred";
      return rejectWithValue(message);
    }
  }
);
