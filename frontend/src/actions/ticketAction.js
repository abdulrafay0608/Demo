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
      return { ticket: data.ticket }; // Ensure consistent payload structure
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "An error occurred";
      return rejectWithValue(message);
    }
  }
);

export const GetTicketAction = createAsyncThunk(
  "tickets/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/tickets/get`);
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
export const GetSingleTicketAction = createAsyncThunk(
  "tickets/get/id",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/tickets/get/${id}`);
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
export const GetUserTicketAction = createAsyncThunk(
  "tickets/get-user/id",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/tickets/get-user/${id}`);
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

export const EditTicketAction = createAsyncThunk(
  "tickets/edit",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/tickets/edit/${id}`,
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
export const UpdateStatusAction = createAsyncThunk(
  "tickets/update-status",
  async ({ id, selectedStatus }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/tickets/update-status/${id}`,
        { selectedStatus }
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

export const DeleteTicketAction = createAsyncThunk(
  "tickets/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${API_BASE_URL}/tickets/delete/${id}`
      );
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message || "Failed to delete the ticket. Please try again.";
      return rejectWithValue(message);
    }
  }
);
