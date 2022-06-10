import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postSlice from "./postSlice";
import userSlice from "./userSlice";
import commentSlice from "./CommentSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    users: userSlice,
    comments: commentSlice,
  },
});

export default store;
