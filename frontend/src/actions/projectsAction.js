import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export const AddProjectsAction = createAsyncThunk(
  "projects/add",
  async (myForm, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/projects/add`, myForm);
      return { project: data.project };
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "An error occurred";
      return rejectWithValue(message);
    }
  }
);

export const GetAllProjectsAction = createAsyncThunk(
  "projects/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/projects/get`);
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
export const GetSingleProjectAction = createAsyncThunk(
  "projects/get/id",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/projects/get/${id}`);
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
export const GetUserProjectsAction = createAsyncThunk(
  "projects/get-user-project/id",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/projects/get-user-project/${id}`
      );
      console.log('data', data)
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

export const UpdateProjectStatusAction = createAsyncThunk(
  "projects/update-project-status",
  async ({ id, selectedStatus }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/projects/update-project-status/${id}`,
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

