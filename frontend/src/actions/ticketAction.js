import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export const AddTicketAction = createAsyncThunk(
  "tickets/add",
  async (myForm, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/tickets/add`, myForm);
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

export const GetTicketAction = createAsyncThunk(
  "tickets/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/tickets/get`, {
        withCredentials: true,
      });
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
