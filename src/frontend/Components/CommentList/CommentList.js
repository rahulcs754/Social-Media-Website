import styles from "./CommentList.module.css";

import { useSelector } from "react-redux";

export const CommentList = () => {
  const { comments, loading } = useSelector((state) => state.comments);

  return (
    <div className="flex flex-column width-100 margin-auto ">
      {comments.map((comment) => {
        return (
          <div className={`flex flex-column p-s ${styles.post}`}>
            <div className={`flex flex-row ${styles.post_header}`}>
              <div className={`flex flex-column ${styles.data_info}`}>
                <span>@{comment.username}</span>
                <span className={` ${styles.post_time}`}>{comment.text}</span>
              </div>
              <div className={` ${styles.note_options} pointer`}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
