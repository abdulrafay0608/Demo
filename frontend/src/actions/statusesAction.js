import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export const AddStatusesAction = createAsyncThunk(
  "statuses/add",
  async (myForm, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/statuses/add`,
        myForm
      );
      return { status: data.status };
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "An error occurred";
      return rejectWithValue(message);
    }
  }
);

export const GetStatusesAction = createAsyncThunk(
  "statuses/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/statuses/get`);
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

export const DeleteStatusesAction = createAsyncThunk(
  "statuses/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${API_BASE_URL}/statuses/delete/${id}`
      );
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message ||
            "Failed to delete the status. Please try again.";
      return rejectWithValue(message);
    }
  }
);

export const EditStatusesAction = createAsyncThunk(
  "statuses/edit",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/statuses/edit/${id}`,
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