import styles from "./Post.module.css";
import { BiLike, BiCommentDetail } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../../utility/user";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likeOrUnlikePost } from "store/postSlice";
import { addBookmark, removeBookmark } from "store/authSlice";
import { IoIosMore } from "react-icons/io";
import { EditModel } from "../Model/EditModel";
import {
  MdBookmarkAdd,
  MdDeleteOutline,
  MdEdit,
  MdBookmarkRemove,
  MdBookmarkBorder,
} from "react-icons/md";

const getSingleUser = (_id) => {
  try {
    const res = getUserById(_id);
    setUserDetails(res?.data?.user);
  } catch (err) {
    toast.warning(err);
  }
};

export const Post = (item) => {
  const dispatch = useDispatch();
  const { _id, content, username, createdAt, likes, comments } = item;
  const [postMenu, setPostMenu] = useState(false);
  const [editmodal, setEditModal] = useState(false);
  const navigate = useNavigate();

  const {
    data: { user: live, userToken },
  } = useSelector((store) => store.auth);
  const { users } = useSelector((store) => store.users);
  const { likeCount, likedBy } = likes;
  const postUser = users.find((item) => item.username === username);

  const deletePostHandler = (postId) => {
    dispatch(deletePost(postId));
    toast("Post deleted");
  };

  const addBookmarkHandler = (postId, userToken) => {
    dispatch(addBookmark({ postId: postId, authorization: userToken }));
    toast("Post Added into bookmark");
  };

  const removeBookmarkHandler = (postId, userToken) => {
    dispatch(removeBookmark({ postId: postId, authorization: userToken }));
    toast("Post Removed From bookmark");
  };

  const LikeOrUnLikeHandler = (post) => {
    return likedBy.find((item) => item.username === live.username)
      ? dispatch(likeOrUnlikePost({ type: "dislike", _id: post._id }))
      : dispatch(likeOrUnlikePost({ type: "like", _id: post._id }));
  };

  return (
    <div className={`flex flex-column p-s ${styles.post}`}>
      <div className={`flex flex-row ${styles.post_header}`}>
        <img
          className="badge-img profile_icon_size"
          src="https://picsum.photos/200"
          alt="badge-1"
        />
        <div className={`flex flex-column ${styles.data_info}`}>
          <span>{postUser?.firstName}</span>
          <span className={` ${styles.post_time}`}>{createdAt}</span>
        </div>
        <div className={` ${styles.note_options} pointer`}>
          <IoIosMore size={28} onClick={() => setPostMenu((prev) => !prev)} />
          {postMenu ? (
            <div className={`flex flex-column ${styles.menu}`}>
              {live.username === postUser.username ? (
                <div>
                  {live.bookmarks.includes(_id) ? (
                    <MdBookmarkRemove
                      size={25}
                      className={styles.menu_option}
                      onClick={() => removeBookmarkHandler(_id, userToken)}
                    />
                  ) : (
                    <MdBookmarkAdd
                      size={25}
                      className={styles.menu_option}
                      onClick={() => addBookmarkHandler(_id, userToken)}
                    />
                  )}

                  <MdEdit
                    size={25}
                    className={styles.menu_option}
                    onClick={() => setEditModal(!editmodal)}
                  />
                  <MdDeleteOutline
                    size={25}
                    onClick={() => deletePostHandler(_id)}
                  />
                </div>
              ) : live.bookmarks.includes(_id) ? (
                <MdBookmarkRemove
                  size={25}
                  className={styles.menu_option}
                  onClick={() => removeBookmarkHandler(_id, userToken)}
                />
              ) : (
                <MdBookmarkAdd
                  size={25}
                  className={styles.menu_option}
                  onClick={() => addBookmarkHandler(_id, userToken)}
                />
              )}
            </div>
          ) : null}
        </div>
      </div>
      <div className={`p-s ${styles.post_body}`}>{content}</div>
      <div className={` ${styles.post_footer} space-around`}>
        <p className="space-between flex-row ">
          {likeCount}
          <BiLike
            size={18}
            className="pointer"
            onClick={() => LikeOrUnLikeHandler(item)}
          />
        </p>
        <p
          className="space-between flex-row"
          onClick={() => navigate(`/post/${_id}`)}
        >
          {comments.length > 0 ? comments.length : 0}
          <BiCommentDetail size={18} className="pointer" />
        </p>
      </div>
      {editmodal ? <EditModel post={item} setEdit={setEditModal} /> : null}
    </div>
  );
};
