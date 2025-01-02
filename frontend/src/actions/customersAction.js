import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export const AddCustomerAction = createAsyncThunk(
  "customers/add",
  async (myForm, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/customers/add`,
        myForm
      );
      return { customer: data.customer };
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "An error occurred";
      return rejectWithValue(message);
    }
  }
);

export const GetAllCustomersAction = createAsyncThunk(
  "customers/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/customers/get`);
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
export const GetSingleCustomerAction = createAsyncThunk(
  "customers/get/id",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/customers/get/${id}`);
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
// export const GetUserProjectsAction = createAsyncThunk(
//   "projects/get-user-project/id",
//   async (id, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(
//         `${API_BASE_URL}/projects/get-user-project/${id}`
//       );
//       console.log("data", data);
//       return data;
//     } catch (error) {
//       const message =
//         error.response && error.response.data && error.response.data.message
//           ? error.response.data.message
//           : error.message || "An error occurred";
//       return rejectWithValue(message);
//     }
//   }
// );

export const UpdateCustomerStatusAction = createAsyncThunk(
  "customers/update-customer-status",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/customers/update-customer-status/${id}`,
        { status }
      );
      console.log("data", data);
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
