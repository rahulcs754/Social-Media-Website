import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  comments: [],
  loading: false,
};

export const getCommentsOfPost = createAsyncThunk(
  "comment/getCommentOfPost",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/comments/${postId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const addNewCommentToPost = createAsyncThunk(
  "comment/addNewComment",
  async (commentData, { getState, rejectWithValue }) => {
    try {
      const {
        data: { userToken },
      } = getState().auth;
      const { postId, comment } = commentData;
      const res = await axios.post(
        `/api/comments/add/${postId}`,
        { commentData: comment },
        { headers: { authorization: userToken } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (comment, { getState, rejectWithValue }) => {
    try {
      const {
        data: { userToken },
      } = getState().auth;

      const { postId, commentId } = comment;

      const res = await axios.post(
        `/api/comments/delete/${postId}/${commentId}`,
        {},
        { headers: { authorization: userToken } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsOfPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCommentsOfPost.fulfilled, (state, action) => {
        const { comments } = action.payload;
        state.comments = comments;
        state.loading = false;
      })
      .addCase(getCommentsOfPost.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addNewCommentToPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewCommentToPost.fulfilled, (state, action) => {
        const { comments } = action.payload;
        state.comments = comments;
        state.loading = false;
      })
      .addCase(addNewCommentToPost.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { comments } = action.payload;
        state.comments = comments;
        state.loading = false;
      })
      .addCase(deleteComment.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default commentSlice.reducer;
