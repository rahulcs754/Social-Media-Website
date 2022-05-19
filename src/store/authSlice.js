import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

export const loginCheck = createAsyncThunk(
  "login",
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

export const SignupUser = createAsyncThunk(
  "signup",
  async (userCredentail, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.post(
        `/api/auth/signup`,
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
    data: { user: {}, userToken: "" },
    status: STATUSES.IDLE,
    message: "",
    isLogged: false,
    isRegisterd: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginCheck.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.message = "";
      })
      .addCase(loginCheck.fulfilled, (state, action) => {
        console.log(action.payload);
        state.data.user = action.payload.foundUser;
        state.data.userToken = action.payload.encodedToken;
        state.status = STATUSES.IDLE;
        state.message = "";
        state.isLogged = true;
      })
      .addCase(loginCheck.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.message = "Incorrect login or password!";
        state.data = {};
        state.isLogged = false;
      })
      .addCase(SignupUser.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.message = "";
      })
      .addCase(SignupUser.fulfilled, (state, action) => {
        state.data.user = action.payload.createdUser;
        state.data.userToken = action.payload.encodedToken;
        state.status = STATUSES.IDLE;
        state.message = "";
        state.isRegisterd = true;
      })
      .addCase(SignupUser.rejected, (state, action) => {
        state.registerStatus = STATUSES.ERROR;
        state.regMessage = "Incorrect login or password!";
        state.regData = {};
        state.isRegisterd = false;
      });
  },
});

export default authSlice.reducer;
