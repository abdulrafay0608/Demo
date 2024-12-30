import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export const AddTicketPriorityAction = createAsyncThunk(
  "ticket_priority/add",
  async (myForm, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/ticket_priority/add`,
        myForm
      );
      return { priority: data.priority };
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "An error occurred";
      return rejectWithValue(message);
    }
  }
);

export const GetTicketPriorityAction = createAsyncThunk(
  "ticket_priority/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/ticket_priority/get`);
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

export const DeleteTicketPriorityAction = createAsyncThunk(
  "ticket_priority/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${API_BASE_URL}/ticket_priority/delete/${id}`
      );
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message || "Failed to delete the status. Please try again.";
      return rejectWithValue(message);
    }
  }
);

export const EditTicketPriorityAction = createAsyncThunk(
  "ticket_priority/edit",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/ticket_priority/edit/${id}`,
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
