import { useRef, useState } from "react";
import styles from "./Commentbox.module.css";
import { useDispatch } from "react-redux";
import { addNewCommentToPost } from "store/CommentSlice";
import { CommentList } from "../CommentList/CommentList";
export const Commentbox = ({ post }) => {
  const dispatch = useDispatch();
  const replyText = useRef();
  const [error, setError] = useState(false);

  const replyHandler = () => {
    if (replyText.current.value.length > 0) {
      setError(false);
      dispatch(
        addNewCommentToPost({
          postId: post._id,
          comment: { text: replyText.current.value },
        })
      );
      replyText.current.value = "";
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className={` flex p-s ${styles.comment_box}`}>
        <div>Replying to @{post.username}</div>
        <textarea className={styles.comment_input} ref={replyText}></textarea>
        <div className={`flex flex-row  ${styles.comment_button}`}>
          <button className="btn btn-primary" onClick={replyHandler}>
            Reply
          </button>
        </div>
        <small className="text-danger">
          {error ? "Please Fill Field" : null}
        </small>
      </div>
      <CommentList />
    </>
  );
};
