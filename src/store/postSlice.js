import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUSES } from "./authSlice";
import axios from "axios";

export const getAllPost = createAsyncThunk(
  "get/postdata",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/posts");
      return response.data.posts;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const getUserPost = createAsyncThunk(
  "get/user_posts",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/posts/${username}`);
      console.log("response check", response);
      return response.data.posts;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const addPost = createAsyncThunk(
  "add/post",
  async ({ postData, authorization }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/posts",
        { postData },
        { headers: { authorization } }
      );
      return response.data.posts;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/edit",
  async ({ postData, authorization }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/posts/edit/${postData._id}`,
        { postData },
        { headers: { authorization } }
      );
      return response.data.posts;
    } catch (err) {
      thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/delete",
  async (postId, { getState, rejectWithValue }) => {
    try {
      const {
        data: { userToken },
      } = getState().auth;
      const response = await axios.delete(`/api/posts/${postId}`, {
        headers: { authorization: userToken },
      });
      return response.data.posts;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const likeOrUnlikePost = createAsyncThunk(
  "post/like",
  async (post, { rejectWithValue }) => {
    try {
      console.log("postdata", post);
      const {
        data: { userToken },
      } = getState().auth;
      const response = await axios.post(
        `/api/posts/${post.type}/${post._id}`,
        {},
        { headers: { authorization: userToken } }
      );
      console.log("post ", post);
      console.log("response", response);
      return response.data.posts;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    allposts: [],
    liveUserPosts: [],
    posts: [],
    status: STATUSES.IDLE,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPost.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.isLoading = true;
      })
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.allposts = action.payload;
        state.status = STATUSES.IDLE;
        state.isLoading = false;
      })
      .addCase(getAllPost.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.allposts = {};
        state.isLoading = false;
      })
      .addCase(getUserPost.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.isLoading = true;
      })
      .addCase(getUserPost.fulfilled, (state, action) => {
        state.liveUserPosts = action.payload;
        state.status = STATUSES.IDLE;
        state.isLoading = false;
      })

      .addCase(getUserPost.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.isLoading = false;
        state.liveUserPosts = [];
      })
      .addCase(addPost.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.isLoading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.allposts = action.payload;
        state.status = STATUSES.IDLE;
        state.isLoading = false;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.posts = {};
        state.isLoading = false;
      })

      .addCase(deletePost.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.allposts = action.payload;
        state.status = STATUSES.IDLE;
        state.isLoading = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.posts = {};
        state.isLoading = false;
      })

      .addCase(editPost.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.isLoading = true;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.allposts = action.payload;
        state.status = STATUSES.IDLE;
        state.isLoading = false;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.posts = {};
        state.isLoading = false;
      })
      .addCase(likeOrUnlikePost.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.isLoading = true;
      })
      .addCase(likeOrUnlikePost.fulfilled, (state, action) => {
        state.allposts = action.payload;
        state.status = STATUSES.IDLE;
        state.isLoading = false;
      })
      .addCase(likeOrUnlikePost.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.posts = {};
        state.isLoading = false;
      });
  },
});

export default postSlice.reducer;
