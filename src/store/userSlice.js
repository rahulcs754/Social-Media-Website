import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUSES } from "./authSlice";
import axios from "axios";

export const editUser = createAsyncThunk(
  "user/editUser",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const {
        data: { userToken },
      } = getState().auth;
      const res = await axios.post(
        "/api/users/edit",
        { userData },
        { headers: { authorization: userToken } }
      );
      return res.data;
    } catch (err) {
      console.log(err);
      rejectWithValue(err);
    }
  }
);

export const getAllusers = createAsyncThunk(
  "get_alluser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/users");
      return response?.data?.users;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const followUser = createAsyncThunk(
  "followuser",
  async (
    { followUserId, authorization, dispatch, updateUser },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `/api/users/follow/${followUserId}`,
        {},
        { headers: { authorization } }
      );
      dispatch(updateUser(response.data.user));
      return response.data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const unFollowUser = createAsyncThunk(
  "unfollowuser",
  async (
    { followUserId, authorization, dispatch, updateUser },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `/api/users/unfollow/${followUserId}`,
        {},
        { headers: { authorization } }
      );
      dispatch(updateUser(response.data.user));
      return response;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    message: "",
    status: STATUSES.IDLE,
  },
  reducers: {
    allUsereditProfile(state, action) {
      const { id, profileImg } = action.payload;
      state.users = state.users.map((user) =>
        user._id === id ? { ...user, pic: profileImg } : user
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllusers.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.message = "";
        state.loading = true;
      })
      .addCase(getAllusers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = STATUSES.IDLE;
        state.message = "";
        state.loading = false;
      })
      .addCase(getAllusers.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.message = "Oops Something went wrong";
        state.users = [];
        state.loading = false;
      })
      .addCase(followUser.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.loading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.loading = false;
        state.users = state.users.map((item) =>
          item.username === action.payload.followUser.username
            ? action.payload.followUser
            : item
        );
        state.users = state.users.map((item) =>
          item.username === action.payload.user.username
            ? action.payload.user
            : item
        );
      })
      .addCase(followUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.message = "Oops Something went wrong";
        state.loading = false;
      })
      .addCase(unFollowUser.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.loading = true;
      })
      .addCase(unFollowUser.fulfilled, (state, action) => {
        state.users = state.users.map((item) =>
          item.username === action.payload.followUser.username
            ? action.payload.followUser
            : item
        );
        state.users = state.users.map((item) =>
          item.username === action.payload.user.username
            ? action.payload.user
            : item
        );
        state.status = STATUSES.IDLE;
        state.loading = false;
      })
      .addCase(unFollowUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.message = "Oops Something went wrong";
        state.loading = false;
      });
  },
});

export const { allUsereditProfile } = userSlice.actions;
export default userSlice.reducer;
