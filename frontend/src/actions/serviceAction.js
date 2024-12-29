import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export const AddServiceAction = createAsyncThunk(
  "services/add",
  async (myForm, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/services/add`,
        myForm
      );
      return { services: data.services }; // Ensure consistent payload structure
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "An error occurred";
      return rejectWithValue(message);
    }
  }
);

export const GetServicesAction = createAsyncThunk(
  "services/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/services/get`);
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

export const DeleteServiceAction = createAsyncThunk(
  "services/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${API_BASE_URL}/services/delete/${id}`
      );
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message ||
            "Failed to delete the service. Please try again.";
      return rejectWithValue(message);
    }
  }
);

export const EditServiceAction = createAsyncThunk(
  "services/edit",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/services/edit/${id}`,
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