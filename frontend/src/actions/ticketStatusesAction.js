import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export const AddTicketStatusesAction = createAsyncThunk(
  "ticket_statuses/add",
  async (myForm, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/ticket_statuses/add`,
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

export const GetTicketStatusesAction = createAsyncThunk(
  "ticket_statuses/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/ticket_statuses/get`);
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

export const DeleteTicketStatusesAction = createAsyncThunk(
  "ticket_statuses/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${API_BASE_URL}/ticket_statuses/delete/${id}`
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

export const EditTicketStatusesAction = createAsyncThunk(
  "ticket_statuses/edit",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/ticket_statuses/edit/${id}`,
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