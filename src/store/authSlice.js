import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

export const loginCheck = createAsyncThunk(
  "auth/login",
  async (userCredentail, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.post(
        `/api/auth/login`,
        userCredentail
      );
      if (status === 200 || status === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: {},
    status: STATUSES.IDLE,
    message: "",
    isLogged: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginCheck.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.message = "";
      })
      .addCase(loginCheck.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
        state.message = "";
        state.isLogged = true;
      })
      .addCase(loginCheck.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.message = "Incorrect login or password!";
        state.data = {};
        state.isLogged = false;
      });
  },
});

export default authSlice.reducer;
