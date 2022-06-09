import { useRef, useState } from "react";
import styles from "./Commentbox.module.css";

export const Commentbox = ({ post }) => {
  const replyText = useRef();
  const [error, setError] = useState(false);

  const replyHandler = () => {
    if (replyText.current.value.length > 0) {
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
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
  );
};
