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

/* code for bookmark, follow */

export const getAllBookmark = createAsyncThunk(
  "getallBookmark",
  async ({ authorization }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/users/bookmark", {
        headers: { authorization },
      });
      return response;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const addBookmark = createAsyncThunk(
  "addBookmark",
  async ({ postId, authorization }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/users/bookmark/${postId}`,
        {},
        { headers: { authorization } }
      );
      return response.data.bookmarks;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const removeBookmark = createAsyncThunk(
  "removeBookmark",
  async ({ postId, authorization }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/users/remove-bookmark/${postId}`,
        {},
        { headers: { authorization } }
      );
      return response.data.bookmarks;
    } catch (err) {
      rejectWithValue(err.response.data);
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
  reducers: {
    updateUser(state, action) {
      state.data.user = action.payload;
    },
    logout(state, action) {
      state.data = { user: {}, userToken: "" };
      state.message = "";
      state.isLogged = false;
      state.isRegisterd = false;
      state.status = STATUSES.IDLE;
    },
    editProfile(state, action) {
      const { profileImg } = action.payload;
      state.data.user.pic = profileImg;
      state.status = STATUSES.IDLE;
    },
    editProfileInfo(state, action) {
      state.data.user.username = action.payload.username;
      state.data.user.link = action.payload.link;
      state.data.user.bio = action.payload.bio;
      state.status = STATUSES.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginCheck.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.message = "";
      })
      .addCase(loginCheck.fulfilled, (state, action) => {
        state.data.user = action.payload.foundUser;
        state.data.userToken = action.payload.encodedToken;
        delete action.payload.foundUser.password;
        state.status = STATUSES.IDLE;
        state.message = "";
        state.isLogged = true;
      })
      .addCase(loginCheck.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.message = "Incorrect login or password!";
        state.data = {};
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
        state.isLogged = true;
      })
      .addCase(SignupUser.rejected, (state, action) => {
        state.registerStatus = STATUSES.ERROR;
        state.regMessage = "Incorrect login or password!";
        state.regData = {};
        state.isRegisterd = false;
        state.isLogged = false;
      })
      .addCase(addBookmark.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.message = "";
        state.loading = true;
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.data.user.bookmarks = action.payload;
        state.status = STATUSES.IDLE;
        state.message = "";
        state.loading = false;
      })
      .addCase(addBookmark.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.message = "Oops Something went wrong";
        state.users = [];
        state.loading = false;
      })
      .addCase(removeBookmark.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.message = "";
        state.loading = true;
      })
      .addCase(removeBookmark.fulfilled, (state, action) => {
        state.data.user.bookmarks = action.payload;
        state.status = STATUSES.IDLE;
        state.message = "";
        state.loading = false;
      })
      .addCase(removeBookmark.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.message = "Oops Something went wrong";
        state.users = [];
        state.loading = false;
      });
  },
});

export const { editProfile, logout, updateUser, editProfileInfo } =
  authSlice.actions;

export default authSlice.reducer;
